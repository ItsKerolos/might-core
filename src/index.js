/**
* @typedef { object } Step
* @property {
   'wait' |
   'viewport' |
   'select' |
   'hover' |
   'click' |
   'type'
  } action
* @property { any } value
*/

export const actions = [
  'wait',
  'viewport',
  'select',
  'hover',
  'click',
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

  else if (step.action === 'select')
    return `Select ${step.value}`;
  
  else if (step.action === 'hover')
    return 'Hover';

  else if (step.action === 'click')
    return 'Click';
    
  else if (step.action === 'type')
    return `Type ${step.value}`;
}

/**
* @param { Step[] } steps
* @param { string } separator
*/
export function stepsToString(steps, separator)
{
  separator = separator || ' 🠮 ';

  return steps.map(serializeStep).join(separator);
}