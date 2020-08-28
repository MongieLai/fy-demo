import React from 'react';
import './App.css';
import Home from './views/Home'
// import Test from './views/Test'

function App() {
  return (
    <div className="App">
      <Home></Home>
      {/* <Test /> */}
      {/* <div>
        <DataGrid data={data} style={{ height: 250 }}>
          <GridColumn field="itemid" title="Item ID"></GridColumn>
          <GridColumn field="name" title="Name"></GridColumn>
          <GridColumn field="listprice" title="List Price" align="right"></GridColumn>
          <GridColumn field="unitcost" title="Unit Cost" align="right"></GridColumn>
          <GridColumn field="attr" title="Attribute" width="30%"></GridColumn>
          <GridColumn field="status" title="Status" align="center"></GridColumn>
        </DataGrid>
      </div> */}

    </div>
  );
}

export default App;
