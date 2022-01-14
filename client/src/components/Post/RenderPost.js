import React, {useState, useEffect} from 'react';

import ClassPost from './ClassPost';

export default function RenderPost() {
    const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    fetch('/getpost')
      .then(data => data.json())
      .then(data => {
        console.log('in get post', data.post);
        if (data.status == 200) {

          setFeeds(data.post);


        }
      })
  }, [])

  return (
    <div>
       <div className="xyz">
          {feeds.map(feed => <ClassPost
            key={feed._id}
            name={feed.name}
            link={feed.link}
            description={feed.description}
          />)}

        </div>
    </div>
  );
}