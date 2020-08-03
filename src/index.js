/**
* @typedef { object } Step
* @property {
   'wait' |
   'viewport' |
   'media' |
   'select' |
   'hover' |
   'click' |
   'drag' |
   'swipe' |
   'keyboard' |
   'type'
  } action
* @property { any } value
*/

export const actions = [
  'wait',
  'viewport',
  'media',
  'select',
  'hover',
  'click',
  'drag',
  'swipe',
  'keyboard',
  'type'
];

/**
* @param { Step } step
* @param { boolean } pretty
*/
function serialize(step, pretty)
{
  /**
  * @param { string } s
  */
  const cs = (s, pretty) => pretty ? s : s.toLowerCase();

  if (step.action === 'wait' && typeof step.value === 'number')
    return `${cs('Wait', pretty)} ${step.value}s`;
  
  else if (step.action === 'wait')
    return `${cs('Wait For', pretty)} ${step.value}`;

  else if (step.action === 'viewport')
    return `${cs('Viewport', pretty)} ${step.value}`;

  else if (step.action === 'media')
  {
    const [ name, value ] = step.value.split(':');

    let output;

    if (pretty)
      output = value;
    else
      output = `${name} ${value}`;

    return `${cs('Media', pretty)} ${output}`;
  }

  else if (step.action === 'select')
    return `${cs('Select', pretty)} ${step.value}`;
  
  else if (step.action === 'hover')
    return `${cs('Hover', pretty)}`;

  else if (step.action === 'click')
    return `${cs('Click', pretty)}`;

  else if (step.action === 'drag')
  {
    const [ x1, y1 ] = step.value;

    let output;

    if (pretty)
      output = '';
    else
      output = `${x1} ${y1}`;

    return `${cs('Drag', pretty)} ${output}`;
  }

  else if (step.action === 'swipe')
  {
    let [ x0, y0, x1, y1 ] = step.value;

    let output;

    if (pretty)
    {
      x0 = parseInt(x0);
      x1 = parseInt(x1);
  
      y0 = parseInt(y0);
      y1 = parseInt(y1);

      const xDiff = x0 - x1;
      const yDiff = y0 - y1;
  
      if (xDiff > 0)
        output = 'Left';
      else if (xDiff < 0)
        output = 'Right';

      if (yDiff > 0)
        output = output ? `Upper ${output}` : 'Up';
      else if (yDiff < 0)
        output = output ? `Lower ${output}` : 'Down';
    }
    else
    {
      output = `${x0} ${y0} ${x1} ${y1}`;
    }

    return `${cs('Swipe', pretty)} ${output}`;
  }

  else if (step.action === 'keyboard')
    return `${cs('Keyboard', pretty)} ${step.value}`;
    
  else if (step.action === 'type')
    return `${cs('Type', pretty)} ${step.value}`;

  else return undefined;
}

/**
* @param { Step } step
* @param { boolean } pretty
*/
export function serializeStep(step, pretty)
{
  return serialize(step, pretty).replace(/\s+/, ' ').trim();
}

/**
* @param { Step[] } steps
* @param { boolean } pretty
*/
export function stepsToString(steps, pretty)
{
  return steps
    .map(i => serializeStep(i, pretty))
    .filter(s => s !== undefined)
    .join(pretty ? ' 🠮 ' : '_');
}