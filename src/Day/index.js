import React, {PureComponent} from 'react';
import classNames from 'classnames';
import parse from 'date-fns/parse';
import styles from './Day.scss';
import getDay from 'date-fns/get_day';
import isSameWeek from 'date-fns/is_same_week';


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


    // var now = new Date();
    // var isThisWeek = isSameWeek(now,date);
    // var dayOfWeek = getDay(date);
    // var isStartSelection = isThisWeek && (dayOfWeek === 1);
    // var isMidSelection = isThisWeek &&  (1 < dayOfWeek && dayOfWeek < 5);
    // var isEndSelection = isThisWeek &&  (dayOfWeek === 5);



    // var now = new Date();
    // var isThisWeek = isSameWeek(now,date);
    var dayOfWeek = getDay(date);    


    var isStartSelection =  (dayOfWeek === 1);
    var isMidSelection = (1 < dayOfWeek && dayOfWeek < 5);
    var isEndSelection = (dayOfWeek === 5);



    return (
      <li
        style={color ? {color} : null}
        className={classNames(styles.root, {          
          [styles.today]: isToday,
          [styles.highlighted]: isHighlighted,
          [styles.selected]: isSelected,
          [styles.disabled]: isDisabled,
//           [styles.enabled]: !isDisabled,
          [styles.start]: isStartSelection,
          [styles.betweenRange]: isMidSelection,
          [styles.end]: isEndSelection,

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
        {isSelected && this.renderSelection()}
      </li>
    );
  }
}
