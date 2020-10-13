import React, { useRef, useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Get } from "react-axios";

// styles
import { fl_attention } from "#styles/frontline";
import Button from "#components/shared/Button";

// contexts
import { UserContext } from "#contexts/User";

// assets
import Verified from "#assets/icons/verified.svg";
import VerifiedSolid from "#assets/icons/verified-solid.svg";
import Pending from "#assets/icons/pending.svg";
import Star from "#assets/icons/star.svg";

export const Root = styled(Link)`
  background-color: ${(props) => props.theme.colors.white};
  -webkit-box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  margin-top: 30px;
  min-height: 250px;
  position: relative;
  text-decoration: none;
  width: 100%;

  ${fl_attention(css`
    p {
      text-decoration: underline;
    }
  `)}

  @media all and (min-width: 550px) {
    width: 48%;
  }

  @media all and (min-width: 1000px) {
    max-width: 300px;
    width: 32%;
  }

  ${(props) =>
    props.demo &&
    css`
      &:active,
      &:focus {
        .DemoPopover {
          display: flex !important;
        }
      }
    `}

  ${(props) =>
    props.narrow &&
    css`
      min-height: 150px;

      @media all and (min-width: 480px) {
        width: 48%;
      }
      @media all and (min-width: 600px) {
        width: 100%;
      }
      @media all and (min-width: ${(props) =>
          props.theme.layout.maxWidthMedium}) {
        width: 48%;
      }
    `}
`;

export const Image = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-size: cover;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
  width: 100%;
`;

export const CardContent = styled.div`
  padding: 20px 20px 60px 20px;
`;

export const Title = styled.p`
  color: ${(props) => props.theme.colors.blue};
  font-size: 1.1em;
  font-weight: bold;
  padding-bottom: 20px;
  text-transform: none;
`;

export const Status = styled.span`
  align-items: center;
  bottom: 20px;
  color: ${(props) => props.theme.colors.textLightGrey};
  display: flex;
  font-size: 0.8em;
  position: absolute;
  text-decoration: none !important;
  text-transform: none;

  svg {
    fill: ${(props) => props.theme.colors.textLightGrey};
    height: 20px;
    margin-right: 10px;
  }
`;

export const StyledButton = styled(Button)`
  font-size: 0.8em;
  max-width: 100px;
  padding: 10px 18px;
  width: 46%;
`;

export const ModeratorButtons = styled.div`
  align-items: center;
  bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  left: 0;
  margin-top: 20px;
  position: absolute;
  right: 0;

  button {
    &:active,
    &:focus {
      span {
        display: block !important;
      }
    }
  }
`;

export const UserRecommendations = styled.div`
  align-items: center;
  bottom: 20px;
  color: ${(props) => props.theme.colors.darkGrey};
  display: flex;
  font-size: 0.8em;
  position: absolute;

  &:hover {
    div {
      display: block;
    }
  }

  svg {
    height: 15px;
    margin-right: 5px;
    width: 15px;
  }
`;

export const UserRecommendationsTooltip = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  border-radius: 3px;
  bottom: 25px;
  color: ${(props) => props.theme.colors.white};
  display: none;
  font-size: 0.65rem;
  left: -75px;
  padding: 5px;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  width: 160px;
  z-index: 10;
`;

const Triangle = styled.div`
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: ${(props) => props.theme.colors.darkGrey} transparent
    transparent transparent;
  bottom: -5px;
  display: inline-block;
  height: 0;
  left: 45%;
  position: absolute;
  width: 0;
`;

export const VerifiedInfo = styled.div`
  bottom: 10px;
  cursor: pointer;
  position: absolute;
  right: 10px;
`;

export const VerifiedToolTip = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  border-radius: 3px;
  bottom: 35px;
  color: ${(props) => props.theme.colors.white};
  font-size: 0.65rem;
  left: -55px;
  padding: 5px;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  width: 130px;
  z-index: 10;
`;

const DemoPopup = styled.span`
  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 10px;
  box-shadow: 0px 0px 11px 2px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.colors.textLightGrey};
  display: none;
  font-size: 12px;
  height: fit-content;
  padding: 5px;
  position: absolute;
  right: -100px;
  text-transform: none;
  top: -20px;
  width: 120px;
  z-index: 100;

  @media ${(props) => props.theme.breakpoints.medium} {
    right: -25px;
    top: -62px;
    width: 150px;
  }
`;

// Hover Hook
// this should probably live somewhere else
const useHover = () => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, value];
};

const ResearchGuideCard = ({
  image,
  title,
  link,
  approved,
  status,
  narrow,
  demo,
  pending,
}) => {
  const [hoverRef, isHovered] = useHover();
  const userContext = useContext(UserContext);

  return (
    <Root to={link} narrow={narrow ? 1 : 0}>
      {image ? <Image imageUrl={image} /> : ""}

      <CardContent>
        <Title>{title}</Title>

        {approved && !pending && (
          <>
            <UserRecommendations>
              <Star /> 13
              <UserRecommendationsTooltip>
                User Recommendations
                <Triangle />
              </UserRecommendationsTooltip>
            </UserRecommendations>

            <VerifiedInfo ref={hoverRef}>
              {isHovered ? <VerifiedSolid /> : <Verified />}
              {isHovered ? (
                <VerifiedToolTip>
                  Published By NARA
                  <Triangle />
                </VerifiedToolTip>
              ) : (
                ""
              )}
            </VerifiedInfo>
          </>
        )}

        {!approved && pending && (
          <Get url="/current-user">
            {(error, response, isLoading) => {
              if (response) {
                const { admin } = response.data.data.attributes;

                return (
                  <>
                    {admin ? (
                      <ModeratorButtons>
                        <StyledButton scheme="green-outline">
                          Approve
                          <DemoPopup>
                            This feature is for demonstration purposes only.
                          </DemoPopup>
                        </StyledButton>
                        <StyledButton scheme="red-outline">
                          Reject
                          <DemoPopup>
                            This feature is for demonstration purposes only.
                          </DemoPopup>
                        </StyledButton>
                      </ModeratorButtons>
                    ) : (
                      <Status>
                        <Pending />
                        Pending Moderation
                      </Status>
                    )}
                  </>
                );
              }

              return <div>Loading...</div>;
            }}
          </Get>
        )}
      </CardContent>
    </Root>
  );
};

export default ResearchGuideCard;
