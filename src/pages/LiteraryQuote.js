import React, { useState, useEffect } from 'react';
import styles from '../styles/LiteraryQuote.module.css';

const quotes = [
  { content: "We are all fools in love.", author: "Jane Austen, Pride and Prejudice" },
  { content: "All we have to decide is what to do with the time that is given to us.", author: "J.R.R. Tolkien, The Fellowship of the Ring" },
  { content: "There is nothing either good or bad, but thinking makes it so.", author: "William Shakespeare, Hamlet" },
  { content: "The world breaks everyone, and afterward, many are strong at the broken places.", author: "Ernest Hemingway, A Farewell to Arms" },
  { content: "Time moves slowly, but passes quickly.", author: "Alice Walker, The Color Purple" },
  { content: "Beware; for I am fearless, and therefore powerful.", author: "Mary Shelley, Frankenstein" },
  { content: "The man who does not read has no advantage over the man who cannot read.", author: "Mark Twain" },
  { content: "Hope is the thing with feathers that perches in the soul—and sings the tune without the words—and never stops at all.", author: "Emily Dickinson" },
  { content: "Another world is not only possible, she is on her way. On a quiet day, I can hear her breathing.", author: "Arundhati Roy, War Talk" },
  { content: "To be black and conscious in America is to be in a constant state of rage.", author: "James Baldwin" },
  { content: "You deserve to take up space. You deserve to exist in this world just as much as anyone else.", author: "Akwaeke Emezi, The Death of Vivek Oji" },
  { content: "Freedom is always, and exclusively, freedom for the one who thinks differently.", author: "Rosa Luxemburg" },
  { content: "Survival is not an academic skill. It is learning how to stand alone, unpopular, and sometimes reviled, and how to make common cause with those others identified as outside the structures in order to define and seek a world in which we all can flourish.", author: "Audre Lorde, Sister Outsider" },
  { content: "Do not be silent; there is no limit to the power that may be released through you.", author: "Adrienne Rich" },
  { content: "The true focus of revolutionary change is never merely the oppressive situations that we seek to escape, but that piece of the oppressor which is planted deep within each of us.", author: "Angela Davis" }
];


function LiteraryQuote() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className={styles.quoteContainer}>
      <h3>Literary quote for daily inspiration:</h3>
      <p>"{quote.content}"</p>
      <p>- {quote.author}</p>
      <div className={`${styles['arrow-divider']}`}></div>
    </div>
  );
}

export default LiteraryQuote;
