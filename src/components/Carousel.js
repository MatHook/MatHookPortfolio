import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Card from './Card'

export default class Carousel extends Component {
  constructor(props) {
    super();
    this.state = {
      items: [
        {
          id: 0,
          title: "Test project",
          subTitle: "Project to check adaptive design",
          imgSrc: "./card1.jpg",
          link: "https://github.com/MatHook/antfcv",
          isSelected: false,
        },
        {
          id: 1,
          title: "Battlefield",
          subTitle: "Check some JS code",
          imgSrc: "./card3.jpg",
          link: "https://github.com/MatHook/FDT",
          isSelected: false,
        },
        {
          id: 2,
          title: "School",
          subTitle: "Just a study work",
          imgSrc: "./card2.jpg",
          link: "https://github.com/MatHook/RTUSE",
          isSelected: false,
        },
      ],
    };
  }

  handleCardClick = (id, card) => {

    let items = [...this.state.items];

    items[id].isSelected = items[id].isSelected ? false : true;

    items.forEach((item) => {
      if (item.id !== id) {
        item.isSelected = false;
      }
    });

    this.setState({ items });
  };

  makeItems = (items) => {
    return items.map((item) => {
      return (
        <Card
          item={item}
          click={(e => this.handleCardClick(item.id, e))}
          key={item.id}
        />
      );
    });
  };

  render() {
    return (
      <Container fluid={true}>
        <Row className="justify-content-around">
          {this.makeItems(this.state.items)}
        </Row>
      </Container>
    )
  }
}
