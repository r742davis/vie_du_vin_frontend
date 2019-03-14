<Button
  color="dark"
  style={{marginBottom: '2rem'}}
  onClick={() => {
    const name = prompt('Enter Wine')
    if (name) {
      this.setState(state => ({
        wines: [...state.wines, { id: uuid(), name }]
      }));
    }
  }}
>Add Wine</Button>
