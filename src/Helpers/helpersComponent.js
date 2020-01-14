

export function handleChange(event){
    const value = event.target.value;
    this.setState({
        ...this.state,
        [event.target.name]: value
    });
}