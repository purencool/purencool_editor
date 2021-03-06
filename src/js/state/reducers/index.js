import { 
  ADD_ARTICLE,  
  PASS_FILE_PATH 
} from "../constants/action-types";

const initialState = {
  articles: [],
  passFilePath:[]
};

/*
@todo need to move the reduces to this
import { combineReducers } from 'redux';
import characters from './characters_reducer';
import heroes from './heroes_reducer';

const rootReducers = combineReducers({
    characters,
    heroes
});

export default rootReducers;
*/
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return { ...state, articles: [...state.articles, action.payload] };
    case PASS_FILE_PATH:
      
  console.log('this is pass file',action.payload);
      return { ...state, passFilePath: [...state.passFilePath, action.payload] };  
    default:

      return state;
  }
  
};
export default rootReducer;