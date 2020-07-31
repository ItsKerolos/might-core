/**
* @typedef { object } Step
* @property {
   'wait' |
   'viewport' |
   'media' |
   'select' |
   'hover' |
   'click' |
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
  'keyboard',
  'type'
];

/**
* @param { Step } step
*/
export function serializeStep(step)
{
  if (step.action === 'wait' && typeof step.value === 'number')
    return `Wait ${step.value}s`;
  
  else if (step.action === 'wait')
    return `Wait For ${step.value}`;

  else if (step.action === 'viewport')
    return `Viewport ${step.value}`;

  else if (step.action === 'media')
  {
    const [ , value ] = step.value.split(':');

    return `Media ${value.trim()}`;
  }

  else if (step.action === 'select')
    return `Select ${step.value}`;
  
  else if (step.action === 'hover')
    return 'Hover';

  else if (step.action === 'click')
    return 'Click';

  else if (step.action === 'keyboard')
    return `Keyboard ${step.value}`;
    
  else if (step.action === 'type')
    return `Type ${step.value}`;

  else return undefined;
}

/**
* @param { Step[] } steps
* @param { string } separator
*/
export function stepsToString(steps, separator)
{
  separator = separator || ' 🠮 ';

  return steps
    .map(serializeStep)
    .filter(s => s !== undefined)
    .join(separator);
}