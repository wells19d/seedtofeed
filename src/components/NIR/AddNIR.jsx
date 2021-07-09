import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function AddNIR(){
    //(field_id, oil, moisture, protein, energy, amino_acids, tested_at) 

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const field_id = params.fieldID;

    //gets current date and time.
    const tested_at = new Date();

    // If we want a different format, we can use this:
    // const cDay = tested_at.getDate()
    // const cMonth = tested_at.getMonth() + 1
    // const cYear = tested_at.getFullYear()

    const [oil, setOil] = useState('');
    const [moisture, setMoisture] = useState('');
    const [protein, setProtein] = useState('');
    const [energy, setEnergy] = useState('');
    const [amino_acids, setAminoAcids] = useState('');
    
    function button(){
        event.preventDefault();

        dispatch({
            type: 'ADD_NIR',
            payload: {
                field_id: field_id,
                oil: oil,
                moisture: moisture,
                protein: protein,
                energy: energy,
                amino_acids: amino_acids,
                tested_at: tested_at
            }
        })

        history.push(`/field_details/${field_id}`);
    }

    return (
        <>
         <div>
      <form className='add-NIR' onSubmit={button}>
        <h2>NIR</h2>

        <div>
          <label htmlFor='oil'>
            Oil:
            <input
              placeholder='Oil'
              type='text'
              name='oil'
              value={oil}
              required
              onChange={(event) => setOil(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='moisture'>
            Moisture:
            <input
              placeholder='moisture'
              type='text'
              name='moisture'
              value={moisture}
              required
              onChange={(event) => setMoisture(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='protein'>
            Protein:
            <input
              placeholder='protein'
              type='text'
              name='protein'
              value={protein}
              required
              onChange={(event) => setProtein(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='energy'>
            Energy:
            <input
              placeholder='energy'
              type='text'
              name='energy'
              value={energy}
              required
              onChange={(event) => setEnergy(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='amino_acids'>
            Amino Acids:
            <input
              placeholder='amino_acids'
              type='text'
              name='amino_acids'
              value={amino_acids}
              required
              onChange={(event) => setAminoAcids(event.target.value)}
            />
          </label>
        </div>

        <div>
          <input
            className='btn'
            type='submit'
            name='submit'
            value='Add NIR'
          />
        </div>
      </form>
    </div>

        </>
    )
}

export default AddNIR;