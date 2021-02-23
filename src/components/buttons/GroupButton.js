import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const buttonComponent = props => {
  const { variant, color, size, ariaLabel, textList } = props;
  return (
    <ButtonGroup variant={variant}
      color={color}
      size={size}
      aria-label={ariaLabel}>
      {textList.map((t, index) => {
        return <Button key={index}>{t}</Button>
      })}
    </ButtonGroup>
  )

}
export default buttonComponent;