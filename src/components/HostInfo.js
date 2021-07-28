import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [
        {key: "high_plains", text: "High Plains", value: "high_plains"},
        {key: "lowlands", text: "Lowlands", value: "lowlands"},
        {key: "under_construction", text: "Under Construction", value: "under_construction"},
        {key: "pariah", text: "Pariah", value: "pariah"},
        {key: "python_pass", text: "Python Pass", value: "python_pass"},
        {key: "badlands", text: "Badlands", value: "badlands"}
      ],
      value: props.selectedHost.area
      // This state is just to show how the dropdown component works.
      // Options have to be formatted in this way (array of objects with keys of: key, text, value)
      // Value has to match the value in the object to render the right text.
  
      // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedHost !== this.props.selectedHost) {
      this.setState({
        value: this.props.selectedHost.area
      })
    }
  }

  render(){
    const {selectedHost, toggle, handleChange} = this.props
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={selectedHost.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {selectedHost.firstName} | { selectedHost.gender === 'Male' ? <Icon name='man' /> : <Icon name='woman' />}
                { /* Think about how the above should work to conditionally render the right First Name and the right gender Icon */ }
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={()=>toggle(selectedHost)}
                  label={selectedHost.active ? 'Active' : 'Decomissioned'}
                  // {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
                  checked={selectedHost.active ? true : false}
                  // {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={(e,value)=>handleChange(e, value, selectedHost)}
                value={this.state.value}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
