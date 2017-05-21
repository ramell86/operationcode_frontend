import React, { Component } from 'react';
import { SQUAD_COLUMNS } from 'shared/constants/table';
import { getSquads } from 'shared/utils/apiHelper';
import IndexTable from 'shared/components/indexTable/indexTable';
import SquadsModal from './squadsModal';

export default class SquadsTable extends Component {

  state = {
    activeSquad: null,
    squads: []
  }

  componentDidMount() {
    getSquads()
    .then((data) => {
      this.setState({
        squads: data
      });
    }).catch(this.setAuthFetchError);
  }

  handleModalClose = () => this.setState({ activeSquad: null });


  rowClickHandler = (squad) => {
    const activeSquad = this.state.squads.find(x => x.id === squad.id);
    this.setState({ activeSquad });
  }

  render() {
    const { activeSquad } = this.state;
    return (
      <div style={{ width: '100%' }} >
        <IndexTable
          heading="Squads"
          columns={SQUAD_COLUMNS}
          onRowClick={this.rowClickHandler}
          fetchRecords={getSquads}
        />
        {!!activeSquad && <SquadsModal
          squad={activeSquad}
          isOpen={!!activeSquad}
          onRequestClose={this.handleModalClose}
        />}
      </div>
    );
  }
}
