import { Pagination, PreLoader, Notice, Button } from 'hbg-react';
import EventList from './EventList';
import FilterContainer from './FilterContainer';
import { getEvents } from '../../../Api/events';
import update from 'immutability-helper';

class FilterableEventsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            currentPage: 1,
            totalPages: 1,
            searchString: '',
            age: null,
            startDate: props.startDate,
            endDate: props.endDate,
            categories: props.categories,
            ageRange: props.ageRange,
        };
    }

    componentDidMount() {
        this.getEvents();
    }

    /**
     * Prevent component from re-render when user edits filters
     * @param nextProps
     * @param nextState
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        const { searchString, startDate, endDate, categories, age } = this.state;
        if (
            searchString !== nextState.searchString ||
            startDate !== nextState.startDate ||
            endDate !== nextState.endDate ||
            age !== nextState.age
        ) {
            return false;
        }

        return true;
    }

    /**
     * Fetch events from API endpoint
     */
    getEvents = () => {
        this.setState({ isLoaded: false, error: null });
        // Declare states and props
        const { currentPage, searchString, startDate, endDate } = this.state;
        let { categories, ageRange } = this.state;
        const {
            translation,
            restUrl,
            moduleId,
            settings,
            lat,
            lng,
            distance,
            tags,
            groups,
            nonce,
        } = this.props;
        const perPage = settings.mod_event_pagination ? settings.mod_event_per_page : -1;
        // Filter checked categories and return the IDs
        categories = categories.filter(category => category.checked).map(category => category.id);
        // Filter checked ages and return the values
        const ageGroup = ageRange.filter(age => age.checked).map(age => age.value);
        // Concatenate all taxonomies together
        const taxonomies = categories.concat(tags, groups);
        // The API base url
        const url = `${restUrl}wp/v2/event/module`;
        // Create list of query parameters
        const params = {
            start_date: startDate,
            end_date: endDate,
            per_page: perPage,
            page: currentPage,
            module_id: moduleId,
            lat,
            lng,
            distance,
            taxonomies,
            age_group: ageGroup,
            search_string: searchString,
            _wpnonce: nonce,
        };

        // Fetch events
        getEvents(url, params)
            .then(response => {
                this.setState({
                    error: null,
                    isLoaded: true,
                    items: response.items,
                    totalPages: response.totalPages,
                });
            })
            .catch(error => {
                console.error('Request failed:', error.message);
                this.setState({
                    items: [],
                    isLoaded: true,
                    error: Error(translation.somethingWentWrong),
                });
            });
    };

    /**
     * Pagination next page handler
     */
    nextPage = () => {
        let { currentPage, totalPages } = this.state;
        if (currentPage === totalPages) {
            return;
        }
        currentPage += 1;
        this.setState({ currentPage }, () => this.getEvents());
    };

    /**
     * Pagination previous page handler
     */
    prevPage = () => {
        let { currentPage } = this.state;
        if (currentPage <= 1) {
            return;
        }
        currentPage -= 1;
        this.setState({ currentPage }, () => this.getEvents());
    };

    /**
     * Pagination input page number handler
     * @param e
     */
    paginationInput = e => {
        const { totalPages } = this.state;
        let currentPage = e.target.value ? parseInt(e.target.value) : '';
        currentPage = currentPage > totalPages ? totalPages : currentPage;

        this.setState({ currentPage }, () => {
            if (currentPage) {
                this.getEvents();
            }
        });
    };

    /**
     * Search string change handler
     * @param e
     */
    updateSearchString = e => {
        this.setState({
            searchString: e.target.value,
        });
    };

    /**
     * Submit form handler
     * @param e
     */
    onSubmit = e => {
        e.preventDefault();
        this.setState({ currentPage: 1 }, () => this.getEvents());
    };

    /**
     * From date change handler
     * @param date
     */
    fromDateChange = date => {
        this.setState({ startDate: this.formatDate(date) });
    };

    /**
     * To date change handler
     * @param date
     */
    toDateChange = date => {
        this.setState({ endDate: this.formatDate(date) });
    };

    /**
     * Format date (Y-m-d)
     * @param date
     * @returns {string}
     */
    formatDate = date => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('sv-SE', options);
    };

    /**
     * Handle categories checkbox changes
     * @param id
     */
    onCategoryChange = (e, id) => {
        const { categories } = this.state;
        // Get the index
        const index = categories.findIndex(obj => obj.id === id);
        // Update state
        this.setState(
            update(this.state, {
                categories: {
                    [index]: {
                        checked: { $set: !categories[index].checked },
                    },
                },
            })
        );
    };

    /**
     * Handle age range checkbox changes
     * @param id
     */
    onAgeChange = (e, id) => {
        const { ageRange } = this.state;
        // Get the index
        const index = ageRange.findIndex(obj => obj.value === id);
        // Update state
        this.setState(
            update(this.state, {
                ageRange: {
                    [index]: {
                        checked: { $set: !ageRange[index].checked },
                    },
                },
            })
        );
    };

    render() {
        const {
            error,
            isLoaded,
            items,
            currentPage,
            totalPages,
            categories,
            ageRange,
        } = this.state;
        const { settings, translation, gridColumn, archiveUrl } = this.props;
        return (
            <div>
                {(settings.mod_event_filter_search ||
                    settings.mod_event_filter_dates ||
                    settings.mod_event_filter_age_group ||
                    settings.mod_event_filter_categories) && (
                    <div className="u-mb-3">
                        <FilterContainer
                            settings={settings}
                            translation={translation}
                            updateSearchString={this.updateSearchString}
                            onSubmit={this.onSubmit}
                            fromDateChange={this.fromDateChange}
                            toDateChange={this.toDateChange}
                            formatDate={this.formatDate}
                            categories={categories}
                            onCategoryChange={this.onCategoryChange}
                            ageRange={ageRange}
                            onAgeChange={this.onAgeChange}
                        />
                    </div>
                )}

                {!isLoaded && (
                    <div className="u-pt-5 u-pb-8">
                        <PreLoader />
                    </div>
                )}

                {(error || (isLoaded && items.length === 0)) && (
                    <div className="u-mb-3">
                        <Notice type="info">{translation.noEventsFound}</Notice>
                    </div>
                )}

                {isLoaded && items.length > 0 && (
                    <div className="grid grid--columns">
                        <EventList
                            items={items}
                            gridColumn={gridColumn}
                            displayFields={settings.mod_event_fields}
                        />
                    </div>
                )}

                <div className="grid">
                    {settings.mod_event_archive && (
                        <div className="grid-xs-12 grid-md-auto u-mb-2 u-mb-2@md u-mb-0@lg u-mb-0@xl">
                            <Button
                                href={archiveUrl}
                                color="primary"
                                title={translation.moreEvents}
                            />
                        </div>
                    )}
                    {settings.mod_event_pagination && (
                        <div className="grid-xs-12 grid-md-fit-content u-ml-auto modularity-mod-event__pagination">
                            <Pagination
                                current={currentPage}
                                total={totalPages}
                                next={this.nextPage}
                                prev={this.prevPage}
                                input={this.paginationInput}
                                langPrev={translation.prev}
                                langNext={translation.next}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default FilterableEventsContainer;