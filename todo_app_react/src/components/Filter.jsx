import React from 'react'

const Filter = ({filter_todo}) => {
  return (
    
    <select className="select-filter" name="" id="" onChange={((e) => filter_todo(e.target.value))}>
            {/* <option value="">All</option> */}
            <option value="Active">Pending</option>
            <option value="Completed">Completed</option>
    </select>
    
  )
}

export default Filter