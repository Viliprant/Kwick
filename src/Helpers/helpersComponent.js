

export function handleChange(event){
    const value = event.target.value;
    this.setState({
        [event.target.name]: value.trim()
    });
}

export function getTimestampOfDay(date){
    const myDate = date;
    const startOfDay = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
    const timestamp = startOfDay / 1000;
    return timestamp;
}

export const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
  }