import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

const cardComponent = props => {
  const { header, headerAction, children } = props
  return (
    <Card>
      {header === undefined ? '' : <CardHeader title={header} />}
      {headerAction === undefined ? '' : <CardHeader action={headerAction} />}
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  )
}
export default cardComponent