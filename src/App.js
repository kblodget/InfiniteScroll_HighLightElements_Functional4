import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { loremIpsum } from "lorem-ipsum";
import Collapsible from "react-collapsible";
import "./styles.css";
import logo from "./logo.svg";
import randomColor from "randomcolor";

import Icon from "./icon/Message";

const rowCount = 20; //class App extends Component {
const App = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  let elementMap = new Map();

  const list = Array(rowCount)
    .fill()
    .map((val, idx) => {
      return {
        id: idx,
        name: "Transaction",
        image: "http://via.placeholder.com/40",
        icon: "message",
        elements: [
          {
            updatedTime: "20 August 2024",
            poc: "Kathy Wilde <webdeveloper_hacc@gmail.com>",
            color: "blue",
          },
          {
            updatedTime: "19 August 2024",
            poc: "Molly Baker <registration_hacc@gmail.com>",
            color: "red",
          },
          {
            updatedTime: "02 Feb. 2024",
            poc: "Joe Downs <accounting_hacc@gmail.com>",
            color: "yellow",
          },
          {
            updatedTime: "11 Nov. 2020",
            poc: "John Mays <jmays@hotmail.com>",
            color: "silver",
          },
        ],
        text: loremIpsum({
          count: 1,
          units: "sentences",
          sentenceLowerBound: 20,
          sentenceUpperBound: 50,
        }),
      };
    });
  //}
  function highlightElement(elem) {
    console.log("key ", elem);
    console.log(elementMap.has(elem));
    if (!elementMap.has(elem)) {
      elementMap.set(elem, true);
      return "highlight-element";
    }
    return "";
  }

  const renderRow = (item) => {
    return (
      <div key={item.id} className="row">
        <div className="content">
          <span className="image">
            <Icon name="message" width={25} fill={randomColor()} />
          </span>
          <span>
            {item.name} {item.id}
          </span>

          <div className="elements_span">{renderElements(item.elements)} </div>

          <Collapsible
            tabIndex={0}
            transitionTime={400}
            trigger="Open Dialog"
            triggerWhenOpen="Click on arrow or press enter key to close Dialog"
          >
            <div>{item.text}</div>
          </Collapsible>
        </div>
      </div>
    );
  };

  const renderElements = (elem) => {
    {
      /* client asked for this feature to randommly select elements from list */
    }
    console.log("elem " + elem);
    const randomIndex = (Math.random() * elem.length) | 0;
    console.log("elem index " + randomIndex);

    const randomElement = elem[randomIndex];
    console.log("randomElement ");
    console.log(randomElement);

    const renderIndivElements = Object.keys(randomElement).map(
      (elemKey, idx) => (
        <div key={idx}>
          <span className={highlightElement(elemKey)}>{elemKey}</span>
          <span>
            {":  "} {randomElement[elemKey]}
          </span>
        </div>
      )
    );

    return <div>{renderIndivElements}</div>;
  };

  const handleInfiniteOnLoad = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1 className="App-title">Detail Transaction List</h1>
      </header>
      <InfiniteScroll
        pageStart={1}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <div className="list">{list.map(renderRow)}</div>
      </InfiniteScroll>
    </div>
  );
};
export default App;
