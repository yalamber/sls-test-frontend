import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '../../../../settings/style-util';
import WithDirection from '../../../../settings/withDirection';

const AgencyFormWrapper = styled.div`

  .ant-form-item-label {
        text-align: left;
   }
`;

export default WithDirection(AgencyFormWrapper);
