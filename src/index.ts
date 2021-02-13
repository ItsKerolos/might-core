export type Step = {
  action: 'wait' |
  'viewport' |
  'goto' |
  'media' |
  'select' |
  'hover' |
  'click' |
  'drag' |
  'swipe' |
  'keyboard' |
  'type';
  value: any;
};

type Options = {
  pretty?: boolean,
  url?: string 
}

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

function stringify(step: Step, opt?: Options)
{
  const cs = (s: string) => (opt?.pretty) ? s : s.toLowerCase();

  if (step.action === 'wait' && typeof step.value === 'number')
    return `${cs('Wait')} ${step.value}s`;
  
  else if (step.action === 'wait')
    return `${cs('Wait For')} ${step.value}`;

  else if (step.action === 'viewport')
  {
    if (!step.value)
      return `${cs('Reset Viewport')}`;
    else
      return `${cs('Viewport')} ${step.value}`;
  }

  else if (step.action === 'goto' && step.value === 'back')
    return `${cs('Go')} Back`;
    
  else if (step.action === 'goto' && step.value === 'forward')
    return `${cs('Go')} Forward`;
    
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
  {
    if (step.value === 'right')
      return `${cs('Right Click')}`;
    else if (step.value === 'middle')
      return `${cs('Middle Click')}`;
    else
      return `${cs('Click')}`;
  }

  else if (step.action === 'drag')
  {
    const [ x1, y1 ] = step.value;

    const output = (opt?.pretty) ? `${x1}, ${y1}` : `${x1} ${y1}`;

    return `${cs('Drag')} ${output}`;
  }

  else if (step.action === 'swipe')
  {
    let [ x0, y0, x1, y1 ] = step.value;

    let output: string;

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

      if (!output)
        output = 'nowhere';
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

export function stringifyStep(step: Step, opt?: Options)
{
  const s = stringify(step, opt);

  return (opt?.pretty) ? s.replace(/\s+/g, ' ').trim() : s;
}

export function stepsToString(steps: Step[], opt?: Options)
{
  return steps
    .map(i => stringifyStep(i, opt))
    .filter(s => s !== undefined)
    .join((opt?.pretty) ? ' 🠮 ' : '_');
}