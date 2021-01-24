import { useContext } from 'react';
// @ts-ignore
import { create } from '../styled';
import { STATIC_COMPONENT } from './staticChildren';

export const STYLES_CONTEXT = Symbol('STYLES_CONTEXT');
const STYLES_SELF = Symbol('STYLES_SELF');

function Enhancement(childComponents, Context) {
  return {
    condition: function (Component) {
      return Boolean(Component.style || Component[STATIC_COMPONENT]);
    },
    init: function (props, WrapperComponent) {
      if (WrapperComponent.style) {
        this[STYLES_SELF] = create([WrapperComponent.style, props._styles]);
      }
    },
    context: function (context) {
      // для оптимизации, если нет детей, то не надо создавать контекст
      if (!this[STYLES_SELF] || !Object.keys(childComponents).length) {
        return context;
      }
      return {
        ...context,
        [STYLES_CONTEXT]: this[STYLES_SELF],
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asProps: function ({ _styles, styles, ...props }) {
      return {
        ...props,
        styles: styles || this[STYLES_SELF],
      };
    },
    wrapperProps: function ({ styles, ...props }) {
      const context = useContext(Context);
      return {
        ...props,
        _styles: styles,
        styles: context[STYLES_CONTEXT],
      };
    },
  };
}

export default Enhancement;
