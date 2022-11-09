import { Box, Divider, Text } from '@chakra-ui/react';
import SvgAward from '@dothis/share/components/ui/Icons/SvgAward';
import SvgCheck from '@dothis/share/components/ui/Icons/SvgCheck';
import SvgSendPlane from '@dothis/share/components/ui/Icons/SvgSendPlane';
import SvgThumbUp from '@dothis/share/components/ui/Icons/SvgThumbUp';
import { colors, fontWeights } from '@dothis/share/lib/styles/chakraTheme';
import { css } from '@emotion/react';
import type { RequestPost, RequestStatusType } from '@prisma/client';
import clsx from 'clsx';
import React from 'react';

import { RequestPostDomain } from '../../domain';

const { statusTypeKor, statusStep, requestStatusType } =
  RequestPostDomain.constants;
const stepToClass = (
  itemStatus: RequestStatusType,
  currentStatus: RequestStatusType,
) => {
  const currentStep = statusStep.get(currentStatus)!;
  const itemStep = statusStep.get(itemStatus)!;
  const stepClass = (() => {
    if (currentStep < itemStep) return '--before';
    if (currentStep === itemStep) return '--current';
    if (currentStep > itemStep) return '--complete';
  })();

  if (itemStatus === 'REQUEST' && currentStep === 0)
    return clsx(stepClass, '--rejected');

  return stepClass;
};

const PostRequestStatus = ({ status }: Pick<RequestPost, 'status'>) => {
  return (
    <Box css={statusStyle}>
      <Box
        className={clsx(
          'request-status-wrapper',
          stepToClass(requestStatusType.REQUEST, status),
        )}
      >
        <Box className="request-status-icon">
          <SvgSendPlane />
        </Box>
        <Text className="request-status-info" as="span">
          {status === 'REFUSE'
            ? statusTypeKor.get('REFUSE')
            : status === 'EXPIRATION'
            ? statusTypeKor.get('EXPIRATION')
            : statusTypeKor.get('REQUEST')}
        </Text>
      </Box>
      <Box className="request-status-divider-wrapper">
        <Divider />
      </Box>
      <Box
        className={clsx(
          'request-status-wrapper',
          stepToClass(requestStatusType.ACCEPT, status),
        )}
      >
        <Box className="request-status-icon">
          <SvgAward />
        </Box>
        <Text className="request-status-info" as="span">
          {statusTypeKor.get('ACCEPT')}
        </Text>
      </Box>
      <Box className="request-status-divider-wrapper">
        <Divider />
      </Box>
      <Box
        className={clsx(
          'request-status-wrapper',
          stepToClass(requestStatusType.REGISTRATION, status),
        )}
      >
        <Box className="request-status-icon">
          <SvgCheck />
        </Box>
        <Text className="request-status-info" as="span">
          {statusTypeKor.get('REGISTRATION')}
        </Text>
      </Box>
      <Box className="request-status-divider-wrapper">
        <Divider />
      </Box>
      <Box
        className={clsx(
          'request-status-wrapper',
          stepToClass(requestStatusType.COMPLETION, status),
        )}
      >
        <Box className="request-status-icon">
          <SvgThumbUp></SvgThumbUp>
        </Box>
        <Text className="request-status-info" as="span">
          {statusTypeKor.get('COMPLETION')}
        </Text>
      </Box>
    </Box>
  );
};
const statusStyle = css`
  display: flex;
  gap: 12px;

  .request-status-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 36px;
    height: 64px;

    &.--before {
      .request-status-icon {
        background: ${colors.gray['50']};

        svg {
          fill: ${colors.white};
        }
      }

      .request-status-info {
        color: ${colors.gray['50']};
      }
    }

    &.--current {
      .request-status-icon {
        background: ${colors.success.default};

        svg {
          fill: ${colors.white};
        }
      }

      .request-status-info {
        color: ${colors.success.default};
        font-weight: ${fontWeights.b};
      }
    }

    &.--complete {
      .request-status-icon {
        background: ${colors.primary['10']};

        svg {
          fill: ${colors.primary['60']};
        }
      }

      .request-status-info {
        color: ${colors.gray['90']};
      }
    }

    &.--rejected {
      .request-status-info {
        color: ${colors.primary['60']};
      }
    }

    .request-status-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 36px;
      border-radius: 12px;
    }

    .request-status-info {
      display: block;
      width: 100%;
      margin-top: auto;

      text-align: center;
      font-size: 14px;
      font-weight: ${fontWeights.m};
    }
  }

  .request-status-divider-wrapper {
    display: flex;
    align-items: center;
    height: 36px;
    width: 24px;
    align-self: start;
  }
`;

export default PostRequestStatus;
