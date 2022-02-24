import { Reducer } from 'redux';
import { CHANGE_THEME, changeTheme } from '../../containers/Configuration';
import { ThemeName } from '../../types';

type State = ThemeName;
type Action =
  | ReturnType<typeof changeTheme>
  | { type: 'OTHER_ACTION'; payload?: any };

export const themeReducer: Reducer<State, Action> = (previousState = localStorage.getItem('theme') || 'light', action) => {
  if (action.type === CHANGE_THEME) {
    localStorage.setItem('theme', action.payload);
    return action.payload;
  }
  return previousState;
};
