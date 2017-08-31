/*
	This is the component that handles the filtering. 
	I chose to put both the filters and sorts in this component, but I'm not confident that this was correct.
*/
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { connector as contentConnector, set_content as setContent, get_content as getContent } from '../../redux/content';
import styles from './UserFilters.scss';
// This is another custom form-input that utilizes React-Select
import SelectInput from '../../common/src/SelectInput/SelectInput';

const cx = classNames.bind(styles);

// Let's layout our sorting options
// We'll store the sort (or filter, below) function for each of these options here.
// In a more robust setup we'd probably config these somehow, but this is fine.
const selectOptions = [
	{
		label: 'Featured',
		value: 'featured',
		sort: (data, initialContent) => initialContent
	},
	{
		label: 'A-Z',
		value: 'a-z',
		sort: (data, initialContent) => data.sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		})
	},
	{
		label: 'Z-A',
		value: 'z-a',
		sort: (data, initialContent) => data.sort((a, b) => {
			if (a.name > b.name) return -1;
			if (a.name < b.name) return 1;
			return 0;
		})
	}
];

@connect(state => ({
	initialContent: state.Content.initialContent,
	filteredContent: state.Content.filteredContent,
    ...contentConnector(state.Content),
  }), { setContent }
)
export default class UserFilters extends Component {
	static propTypes = {
		setContent: PropTypes.func,
		getContent: PropTypes.func,
		data: PropTypes.arrayOf(PropTypes.object),
		initialContent: PropTypes.arrayOf(PropTypes.object),
		filteredContent: PropTypes.arrayOf(PropTypes.object)
	}

	constructor(props) {
		super(props);
		this.state = {
			sortState: selectOptions[0].value,
			filterState: ''
		};
	}

	handleChange = (sortValue) => {
		const { data, setContent, filteredContent } = this.props;

		this.setState({ sortState: sortValue });

		// First let's find the option that matches our state.		
		const option = selectOptions.find(item => item.value === sortValue);

		// Next, let's run the sorting function on our option object
		// Don't forget to run it on a copy of data so you don't mutate state!
		const newData = option.sort(data.slice(), filteredContent);

		// Finally, we'll run our redux action that just sets the state.
		setContent(newData, false);
	}

	handleFilter = (filterValues) => {
		const { data, setContent, initialContent } = this.props;
		
		this.setState({
			filterState: filterValues
		});

		// When the filter value is changed, we need to check if any data is passed. 
		// If not, let's do nothing (we could also check for this in the select component, but i prefer this way)
		// If yes, we'll copy the initialdata then filter it based on the filter prop if each filterValue
		const newData = filterValues.length > 0 ? initialContent.slice().filter(item => {
			let shouldPass = false;
			filterValues.forEach(filterValue => {
				// I chose to use an OR matching, in that if any data matches any test it will pass.
				if (filterValue.filter(item)) {
					shouldPass = true;
				}
			});
			return shouldPass;
		}) : initialContent;

		// After we're done filtering, let's call our redux action.
		setContent(newData, true);
	}

	render() {
		const { sortState, filterState } = this.state;
		const { data, initialContent } = this.props;

		// We'll layout our filter options here because it's based on incoming data, but same setup as above:
		// Again, we could separate this out into a filter component, but I chose not to for the scale of this project.
		const filterOptions = [];
		initialContent.forEach(item => {
			// We only want unique filter values
			!filterOptions.find(filter => filter.value === item.category) && filterOptions.push({
				label: item.category.toUpperCase(),
				value: item.category,
				filter: (filterItem) => item.category === filterItem.category
			});
		});
		// I put the VIP one here instead of sorts because technically it's a filter.
		filterOptions.push({
			label: 'VIP',
			value: 'vip',
			filter: (filterItem) => filterItem.priority === 1 || filterItem.priority === 2
		});

		return (
			<div className={cx('user-filters')}>
				<div className={cx('sorts-wrap')} >
					<div>
						<h2>Sort:</h2>
					</div>
					<div>
						<div className={cx('select-wrap')}>
							<SelectInput
								options={selectOptions}
								value={sortState}
								onChange={this.handleChange}
								clearable={false}
							/>
						</div>
					</div>
				</div>
				<div className={cx('sorts-wrap')}>
					<div>
						<h2>Filter:</h2>
					</div>
					<div>
						<div className={cx('select-wrap')}>
							<SelectInput
								options={filterOptions}
								value={filterState}
								onChange={this.handleFilter}
								multi
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
};