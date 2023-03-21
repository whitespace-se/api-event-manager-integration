import PropTypes from 'prop-types';

const EventItem = ({ event, gridColumn, displayFields }) => (
  <div className={`u-flex ${gridColumn}`}>
    <a href={event.permalink} class="box box--panel box--news" data-equal-item>
      <div class="box__date-event-holder box__date-event-holder--primary">
          <time class="box__date-event box__date-event--primary" datetime={event.occasion}>
              <span class="box__date-event-month box__date-event-month--primary">{event.month}</span>
              <span class="box__date-event-day box__date-event-day--primary">{event.day}</span>
          </time>
      </div>
      {displayFields.includes('image') && event.image_url && (
        <img className="c-card__image" src={event.image_url} alt={event.post_title} />
      )}
      <div class="box__content">
        {event.post_title && <h4 className="link-item link-item-light">{event.post_title}</h4>}
        {displayFields.includes('location') && event.location && (
        <div class="box__event-location">
          <div class="info__box">
            <div class="icon icon--small icon--location">{event.location}</div>
          </div>
        </div>)}
        {displayFields.includes('occasion') && event.occasion && (
        <div class="box__event-location">
          <div class="info__box">
            <div class="icon icon--small icon--calendar"></div>
              <div class="text">{event.occasion}</div>
            </div>
        </div>)}
        <p>{event.excerpt}</p>
      </div>
      <div class="post__arrow"></div>
    </a>
  </div>
);

EventItem.propTypes = {
  displayFields: PropTypes.array,
  event: PropTypes.object.isRequired,
  gridColumn: PropTypes.string,
  
};

EventItem.defaultProps = {
  displayFields: [],
  gridColumn: '',
};

export default EventItem;
