import { atom } from 'recoil'

const selectTask = atom({
  key: 'selectTask', 
  default: ''
});

export default selectTask;