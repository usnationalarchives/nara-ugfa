import React, { useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

// contexts
import { SearchContext } from "#contexts/Search";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import Form, { TextInput } from "#components/shared/Form";

// styles
import { buttonReset } from "#styles/mixins";

// assets
import SearchIcon from "#assets/icons/search.svg";

const Root = styled.div`
  background-image: url(https://d3hg138m6n7vnh.cloudfront.net/shrink-images/6494253-DF-ST-97-01049.jpeg);
  background-position: center;
  background-size: cover;
  height: calc(100vh - 45px);
  position: relative;
`;

const Inner = styled.div`
  left: 0;
  position: absolute;
  right: 0;
  top: 45%;
  width: 100%;
`;

const Search = styled(Form)`
  position: relative;
`;

const Query = styled(TextInput)`
  display: block;
  width: 100%;
`;

const Submit = styled.button`
  ${buttonReset}
  position: absolute;
  top: 10px;
  right: 12px;
`;

const Home = () => {
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  const { register, handleSubmit, errors } = useForm();

  const search = (formData) => {
    searchContext.actions.setQuery(formData.query);
    history.push(`/search?q=${formData.query}`);
  };

  return (
    <Root>
      <Inner>
        <Layout.Padding>
          <Layout.Wrapper narrow>
            <Search onSubmit={handleSubmit(search)}>
              <Query
                placeholder="Search the NARA Catalog"
                type="text"
                name="query"
                ref={register}
              />
              <Submit type="submit">
                <Text.Screenreader>Search the Catalog</Text.Screenreader>
                <SearchIcon height="20" fill="currentColor" />
              </Submit>
            </Search>
          </Layout.Wrapper>
        </Layout.Padding>
      </Inner>
    </Root>
  );
};

export default Home;
