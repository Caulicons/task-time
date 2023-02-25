export default interface taskInterface {
  id: string,
  title: string,
  describer: string,
  time: string,
  isRunning: boolean,
  selected: boolean,
  complete: boolean,
  defaultTime: string
}