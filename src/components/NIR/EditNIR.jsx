import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function EditNIR(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const fieldNIR = useSelector(store => store.fieldNIRReducer);

    const NIRID = params.NIRID;

    const NIR_index = fieldNIR.findIndex(NIR => NIR.id === NIRID);
    const NIR_to_edit = fieldNIR[NIR_index];
    const field_id = NIR_to_edit.field_id;

    const [oil, setOil] = useState(NIR_to_edit.oil);
    const [moisture, setMoisture] = useState(NIR_to_edit.moisture);
    const [protein, setProtein] = useState(NIR_to_edit.protein);
    const [energy, setEnergy] = useState(NIR_to_edit.energy);
    const [amino_acids, setAminoAcids] = useState(NIR_to_edit.amino_acids);
    
    function button(){
        event.preventDefault();

        dispatch({
            type: 'UPDATE_NIR',
            payload: {
                field_id: field_id,
                NIRID: NIRID,
                oil: oil,
                moisture: moisture,
                protein: protein,
                energy: energy,
                amino_acids: amino_acids
            }
        })

        history.push(`/field_details/${field_id}`);
    }

    return (
        <>
            <div>
      <form className='add-NIR' onSubmit={button}>
        <h2>Edit NIR</h2>

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

export default EditNIR;