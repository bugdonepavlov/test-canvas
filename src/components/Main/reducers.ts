import {
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_OFFSET,
  MAX_CARD_IN_COLUMN,
} from "constants/sizes";

export type CommonState = {
  MAX_CARD_IN_COLUMN: number;
};

export type CardStyle = {
  height: number;
  width: number;
  offset: typeof CARD_OFFSET;
  backgroundColor: number;
};

export type LineStyle = {
  color: number;
  width: number;
};

export type SettingsStateType = {
  card: CardStyle;
  line: LineStyle;
  common: CommonState;
  maxHeightColumnWithCard: number;
};

export const initialState: SettingsStateType = {
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    offset: CARD_OFFSET,
    backgroundColor: 0x041422,
  },
  line: {
    color: 0x5f72a6,
    width: 2,
  },
  common: {
    MAX_CARD_IN_COLUMN,
  },
  get maxHeightColumnWithCard() {
    return (
      this.common.MAX_CARD_IN_COLUMN * this.card.height +
      this.common.MAX_CARD_IN_COLUMN * this.card.offset[1]
    );
  },
};

export enum ActionKind {
  CHANGE = "CHANGE",
  RESET = "RESET",
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type SettingsPayload = {
  [ActionKind.CHANGE]: Partial<Pick<SettingsStateType, "card" | "line">>;
  [ActionKind.RESET]: undefined;
};

export type SettingsActions =
  ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

export const reducer = (state: SettingsStateType, action: SettingsActions) => {
  switch (action.type) {
    case ActionKind.CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    case ActionKind.RESET:
      return initialState;
    default:
      return state;
  }
};
