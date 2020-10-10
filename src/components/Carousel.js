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
          title: "Card 1 Title",
          subTitle: "Card 1 SubTitle",
          imgSrc: "./card1.jpg",
          link: "",
          isSelected: false,
        },
        {
          id: 1,
          title: "Card 2 Title",
          subTitle: "Card 2 SubTitle",
          imgSrc: "./card1.jpg",
          link: "",
          isSelected: false,
        },
        {
          id: 2,
          title: "Card 3 Title",
          subTitle: "Card 3 SubTitle",
          imgSrc: "./card1.jpg",
          link: "",
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
