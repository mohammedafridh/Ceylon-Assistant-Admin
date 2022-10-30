import React from 'react'
import './WidgetLg.css'
import Table from 'react-bootstrap/Table';

const WidgetLg = () => {
  return (
    <div className="widgetLg">
      <h3>Active Tours</h3>
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Tour Guide Name</th>
          <th>Tourist Name</th>
          <th>Destination</th>
          <th>Date Range</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mderrv e ref ew  ewfdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
      </tbody>
    </Table>
    </div>
    
  );
}

export default WidgetLg