import React, { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { Collapse } from 'antd';
import { db } from './config';

const { Panel } = Collapse;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching data...');
    const fetchData = async () => {
      try {
        const dataRef = ref(db, '/1hBI5WUxiwG06kncYRV7qhQcO52GqX5qYfup_zfBtN6Q/Sheet1');
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
          const dataArray = [];
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            dataArray.push(childData);
          });
          console.log('Data fetched:', dataArray);
          setData(dataArray);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Data:', data);

  return (
    <div style={{ padding: '20px' }}>
      <Collapse accordion>
        {data.map((item) => (
          <Panel header={item.Question} key={item.ID}>
            <p><strong>Answer:</strong> {item.Answer}</p>
            <p><strong>Topic:</strong> {item.Topic}</p>
            <p><strong>Video Link:</strong> <a href={item.VideoLink} target="_blank" rel="noopener noreferrer">{item.VideoLink}</a></p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default App;
