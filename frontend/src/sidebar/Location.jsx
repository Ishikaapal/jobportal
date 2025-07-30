import React from 'react'
import InputField from '../components/InputField'

const Location = ({handleChange}) => {
  return (
    <div>
        <h4 className="text-lg font-medium mb-2">Location</h4>

        <div className="">
            <label className='sidebar-label-container'>
                <input
                    type="radio"
                    id="test"
                    name="test"
                    // placeholder="placeholder"
                    value=""
                    onChange={handleChange}
                />
                <span className="checkmark"></span>All
            </label>

            <InputField handleChange={handleChange} value="Delhi" title="Delhi" name="test" />
            <InputField handleChange={handleChange} value="Noida" title="Noida" name="test" />
            <InputField handleChange={handleChange} value="Mumbai" title="Mumbai" name="test" />
            <InputField handleChange={handleChange} value="Chenni" title="Chenni" name="test" />
        </div>
    </div>
  )
}

export default Location