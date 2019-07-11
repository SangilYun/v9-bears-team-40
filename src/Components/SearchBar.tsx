import React from "react";
import styled from "../utils/theme";
import { Redirect } from "react-router-dom";
import { ButtonLink } from "./Button";

const Input = styled.input`
  border: 0;
  border-radius: 0.75rem 0 0 0.75rem;
  color: ${props => props.theme.colors.body};
  font-family: ${props => props.theme.fonts.body};
  padding: 0.75rem;
  outline: 0;
  &:focus {
    box-shadow: inset 2px 2px 0 ${props => props.theme.colors.link},
      inset 2px -2px 0 ${props => props.theme.colors.link};
  }
`;

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  border-radius: 0.75rem;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
`;

class SearchBar extends React.Component {
  state = {
    keyword: "",
    userHasRequestedResults: false
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      keyword: event.target.value,
      userHasRequestedResults: false
    });
  };

  handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      this.setState({ userHasRequestedResults: true });
    }
  };

  render() {
    return (
      <Wrapper>
        {/*Send the user to search results page if they submitted a search query*/}
        {this.state.userHasRequestedResults && (
          <Redirect to={`/s/${this.state.keyword}`} />
        )}
        <Input onChange={this.changeHandler} onKeyPress={this.handleKeyPress} />
        <ButtonLink to={`/s/${encodeURI(this.state.keyword)}`}>
          Search
        </ButtonLink>
      </Wrapper>
    );
  }
}

export default SearchBar;
