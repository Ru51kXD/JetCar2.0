import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface LoaderWrapperProps {
  fullScreen?: boolean;
}

const LoaderWrapper = styled.div<LoaderWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.fullScreen ? '100vh' : '300px'};
  width: 100%;
  ${props => props.fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 9999;
  `}
`;

const SpinnerOuter = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
`;

const SpinnerInner = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: #d9a34a;
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  
  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  
  &:nth-child(2) {
    animation-delay: -0.3s;
    border-top-color: #1a1a1a;
  }
  
  &:nth-child(3) {
    animation-delay: -0.15s;
    border-top-color: #ff4d4d;
  }
`;

interface LoaderProps {
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false }) => {
  return (
    <LoaderWrapper fullScreen={fullScreen}>
      <SpinnerOuter>
        <SpinnerInner />
        <SpinnerInner />
        <SpinnerInner />
      </SpinnerOuter>
    </LoaderWrapper>
  );
};

export default Loader; 