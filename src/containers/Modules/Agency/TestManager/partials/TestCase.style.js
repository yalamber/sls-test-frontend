import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '../../../../../settings/style-util';
import WithDirection from '../../../../../settings/withDirection';

const AgencyFormWrapper = styled.div`

    .ant-divider-horizontal.ant-divider-with-text-left .ant-divider-inner-text, .ant-divider-horizontal.ant-divider-with-text-right .ant-divider-inner-text {
        display: inline-block;
        padding: 0px 10px 0px 0px;
    }

    .ant-divider-horizontal.ant-divider-with-text-left:before {
        top: 50%;
        width: 0%;
    }

    .ant-form-item-label {
        text-align: left;
    }

    .ant-form-item-label label:after {
        content: "";
    }

    legend {
        width: auto;
        max-width: auto;
        padding-right: 10px;
        padding-left: 10px;
    }

    fieldset{
        border: 1px solid #e8e8e8;
        padding-left: 10px;
        padding-right: 10px;
        margin: 0;
    }
`;

export default WithDirection(AgencyFormWrapper);
