/**
* @typedef { object } Step
* @property {
   'wait' |
   'viewport' |
   'goto' |
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

/**
* @typedef { object } Options
* @property { boolean } pretty
* @property { string } url
*/

export const actions = [
  'wait',
  'viewport',
  'goto',
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
* @param { Options } opt
*/
function stringify(step, opt)
{
  /**
  * @param { string } s
  */
  const cs = (s) => (opt?.pretty) ? s : s.toLowerCase();

  if (step.action === 'wait' && typeof step.value === 'number')
    return `${cs('Wait')} ${step.value}s`;
  
  else if (step.action === 'wait')
    return `${cs('Wait For')} ${step.value}`;

  else if (step.action === 'viewport')
    return `${cs('Viewport')} ${step.value}`;

  else if (step.action === 'goto')
  {
    let url = step.value;

    if (opt?.pretty)
    {
      if (opt?.url)
        url = url.replace(opt.url, '');

      if (url.endsWith('/'))
        url = url.substring(0, url.length - 1);
    }

    return `${cs('Goto')} ${url}`;
  }

  else if (step.action === 'media')
  {
    const [ name, value ] = step.value.split(':');

    const output = (opt?.pretty) ? value : `${name} ${value}`;

    return `${cs('Media')} ${output}`;
  }

  else if (step.action === 'select')
    return `${cs('Select')} ${step.value}`;
  
  else if (step.action === 'hover')
    return `${cs('Hover')}`;

  else if (step.action === 'click')
    return `${cs('Click')}`;

  else if (step.action === 'drag')
  {
    const [ x1, y1 ] = step.value;

    const output = (opt?.pretty) ? `${x1}, ${y1}` : `${x1} ${y1}`;

    return `${cs('Drag')} ${output}`;
  }

  else if (step.action === 'swipe')
  {
    let [ x0, y0, x1, y1 ] = step.value;

    let output;

    if (opt?.pretty)
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

    return `${cs('Swipe')} ${output}`;
  }

  else if (step.action === 'keyboard')
    return `${cs('Keyboard')} ${step.value}`;
    
  else if (step.action === 'type')
    return `${cs('Type')} ${step.value}`;

  else return undefined;
}

/**
* @param { Step } step
* @param { Options } opt
*/
export function stringifyStep(step, opt)
{
  const s = stringify(step, opt);

  return (opt?.pretty) ? s.replace(/\s+/g, ' ').trim() : s;
}

/**
* @param { Step[] } steps
* @param { Options } opt
*/
export function stepsToString(steps, opt)
{
  return steps
    .map(i => stringifyStep(i, opt))
    .filter(s => s !== undefined)
    .join((opt?.pretty) ? ' 🠮 ' : '_');
}