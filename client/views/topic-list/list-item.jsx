import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from 'material-ui/styles';

import ListItem from 'material-ui/List/ListItem';
import ListItemAvatar from 'material-ui/List/ListItemAvatar';
import ListItemText from 'material-ui/List/ListItemText';
import Avatar from 'material-ui/Avatar';

import { topicPrimaryStyle, topicSecondaryStyles } from './styles';
import { tabs } from '../../util/variable-define';
import formatDate from '../../util/date-format';

const Primary = ({ classes, topic }) => {
  const className = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  });

  return (
    <div className={classes.root}>
      <span className={className}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  );
};

Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary);

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span> / </span>
      <span>{topic.visit_count}</span>
    </span>
    <span>创建时间：{formatDate(topic.create_at, 'yyyy-mm-dd HH:MM:ss')}</span>
  </span>
);

Secondary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const StyledSecondary = withStyles(topicSecondaryStyles)(Secondary);

const TopListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
);

TopListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
};

export default TopListItem;
