import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition } from "@settings/style-util";
import WithDirection from '@settings/withDirection';

const MyStyleWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;

  @media only screen and (max-width: 767px) {
    width: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .isoMyContent {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 767px) {
      order: 2;
      margin-top: 20px;
      align-items: center;
      text-align: center;
      flex-direction: column;
    }

    h3 {
      font-size: 24px;
      font-weight: 400;
      color: ${palette('text', 1)};
      margin: 0 0 10px;
      line-height: 1.2;
    }

    .isoListHolder {
      padding: 20px;
    }

    .myList {
      padding-bottom: 15px;
    }

    .list-header {
      font-weight: bold;
    }

    .login-button {
      font-size: 13px;
      border: none;
      color: ${palette("text", 1)};
      line-height: 1.1;
      padding: 10px 15px;
      background-color: transparent;
      text-decoration: none;
      display: flex;
      justify-content: flex-start;
      ${transition()};
      border-bottom: 1px solid #EEE;
      &:hover {
        background-color: ${palette("secondary", 6)};
      }
      
      .smallText {
        font-size: 10px !important;
      }
    }
  }
`;

export default WithDirection(MyStyleWrapper);
