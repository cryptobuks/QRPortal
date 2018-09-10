import { connect } from 'react-redux';
import BodyNavigation from './bn-model';
import { fetchNavigationData } from './bn-actions';
import { setListCount, showContentView } from '../body/body-actions';
import { fetchWebData, fetchApiData } from '../body-rules-list/brl-actions';
import { fetchStandardsListData } from '../body-standards-list/bsl-actions';
import { appendToHeaderPath } from '../path-navigation/nv-actions';
import { SECTIONS } from './bn-constants';

const mapDispatchToProps = (dispatch) => {
  return {
    tileClick: (link, currentTitle) => {
      switch (currentTitle.toLowerCase()) {
      case SECTIONS.technologies:
        dispatch(setListCount(1));
        dispatch(showContentView());
        dispatch(fetchApiData(link.href));
        break;
      case SECTIONS.standards:
        dispatch(fetchNavigationData(link.name, link.href));
        break;
      case SECTIONS.cisq:
      case SECTIONS.owasp:
        dispatch(setListCount(2));
        dispatch(showContentView());
        dispatch(fetchStandardsListData(link.href));
        break;
      default:
        dispatch(setListCount(1));
        dispatch(showContentView());
        dispatch(fetchWebData(link.href));
        break;
      }
      dispatch(appendToHeaderPath(link));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.navTile.loading,
    title: state.navTile.title,
    navContent: state.navTile.data
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(BodyNavigation);