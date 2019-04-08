import React, {PureComponent} from 'react';
import classNames from 'classnames';
import parse from 'date-fns/parse';
import getDay from 'date-fns/get_day'
import styles from './Day.scss';

export default class Day extends PureComponent {
  handleClick = () => {
    let {date, isDisabled, onClick} = this.props;

    if (!isDisabled && typeof onClick === 'function') {
      onClick(parse(date));
    }
  };

  renderSelection(selectionColor) {
    const {
      day,
      date,
      isToday,
      locale: {todayLabel},
      monthShort,
      theme: {textColor},
      selectionStyle,
    } = this.props;

    return (
      <div
        className={styles.selection}
        data-date={date}
        style={{
          backgroundColor: this.selectionColor,
          color: textColor.active,
          ...selectionStyle,
        }}
      >
        <span className={styles.month}>
          {isToday ? todayLabel.short || todayLabel.long : monthShort}
        </span>
        <span className={styles.day}>{day}</span>
      </div>
    );
  }
  
  render() {
    const {
      className,
      currentYear,
      date,
      day,
      handlers,
      isInDirtyWeek,
      inSelectionRange,
      isDisabled,
      isHighlighted,
      isToday,
      isSelected,
      monthShort,
      theme: {selectionColor, textColor, todayColor},
      year,
    } = this.props;
    let color;

    if (isSelected) {
      color = this.selectionColor = typeof selectionColor === 'function'
        ? selectionColor(date)
        : selectionColor;
    } else if (isToday) {
      color = todayColor;
    }
    else if(textColor) {
      color = this.textColorDefault = typeof textColor.default === 'function'
        ? textColor.default(date) 
        : textColor.default;
    }

    var dayOfWeek = getDay(date);
    var isSelectionStart = (inSelectionRange &&  dayOfWeek === 1);
    
    var isSelectionMiddle = inSelectionRange &&  (1 < dayOfWeek && dayOfWeek < 5 );
    var isSelectionEnd = inSelectionRange && dayOfWeek === 5;

    // mark each sunday of a dirty week 
    var markDirty = isInDirtyWeek && dayOfWeek === 6;

    return (
      <li
        style={color ? {color} : null}
        className={classNames(styles.root, {

  
          [styles.today]: (isToday),
          
          [styles.highlighted]: isHighlighted,
          [styles.selected]: (isSelected && !inSelectionRange),
          
          [styles.disabled]: isDisabled,
          [styles.enabled]: (!(isDisabled || inSelectionRange)),
        
          [styles.rangeOpen]: isSelectionStart,
          [styles.rangeMiddle]: isSelectionMiddle,
          [styles.rangeClose]: isSelectionEnd,
          [styles.dirtyMark]: markDirty,


        }, className)}
        onClick={this.handleClick}
        data-date={date}
        {...handlers}
      >
        {day === 1 && <span className={styles.month}>{monthShort}</span>}
        {isToday ? <span>{day}</span> : day}
        {day === 1 &&
          currentYear !== year &&
          <span className={styles.year}>{year}</span>}
        {/* {isSelected && this.renderSelection()} */}
      </li>
    );
  }
}
