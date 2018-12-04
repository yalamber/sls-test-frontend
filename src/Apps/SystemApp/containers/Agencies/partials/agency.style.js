import styled from 'styled-components';
import WithDirection from '@settings/withDirection';

const AgencyFormWrapper = styled.div`

  .ant-form-item-label {
        text-align: left;
   }

  .ant-input-number {
        width: 100%!important;
    }
`;

export default WithDirection(AgencyFormWrapper);
