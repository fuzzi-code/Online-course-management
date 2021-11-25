import React,{useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DateSelect() {
    const [selectedDate,setSelectedDate]=useState(null)
    return (
        <div>
            <DatePicker selected={selectedDate} 
                        onChange={date=>setSelectedDate(date)}
                        dateFormat='yyyy/MM/dd'
                        isClearable
                        scrollableMonthYearDropdown
                        scrollableYearDropdown
                        />
        </div>
    )
}

export default DateSelect
