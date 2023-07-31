import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBeerPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [description, setDescription] = useState('');
  const [firstBrewed, setFirstBrewed] = useState('');
  const [brewersTips, setBrewersTips] = useState('');
  const [attenuationLevel, setAttenuationLevel] = useState(0);
  const [contributedBy, setContributedBy] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://ih-beers-api2.herokuapp.com/beers/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          tagline: tagLine,
          description,
          first_brewed: firstBrewed,
          brewers_tips: brewersTips,
          attenuation_level: attenuationLevel,
          contributed_by: contributedBy,
        }),
      });

      if (response.status === 200) {
        console.log('New beer created successfully!');
        // You can redirect to a success page or perform other actions here.
        navigate('/'); // Redirect to the home page after successful creation
      } else {
        console.log('Failed to create new beer:', response.status);
      }
    } catch (error) {
      console.log('Error creating new beer:', error);
    }
  };

  return (
    <div>
      <h1>Create a New Beer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Tagline:
          <input type="text" value={tagLine} onChange={(e) => setTagLine(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          First Brewed:
          <input
            type="text"
            value={firstBrewed}
            onChange={(e) => setFirstBrewed(e.target.value)}
          />
        </label>
        <label>
          Brewer's Tips:
          <input type="text" value={brewersTips} onChange={(e) => setBrewersTips(e.target.value)} />
        </label>
        <label>
          Attenuation Level:
          <input
            type="number"
            value={attenuationLevel}
            onChange={(e) => setAttenuationLevel(e.target.value)}
          />
        </label>
        <label>
          Contributed By:
          <input
            type="text"
            value={contributedBy}
            onChange={(e) => setContributedBy(e.target.value)}
          />
        </label>
        <button type="submit">Add Beer</button>
      </form>
    </div>
  );
};

export default AddBeerPage;
