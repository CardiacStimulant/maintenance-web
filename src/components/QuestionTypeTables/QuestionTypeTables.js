import React, { Component} from 'react';
import {Table, Row, Col} from 'tinper-bee';
import './index.less'

class QuestionTypeTables extends Component {

    constructor(props){
        super(props);
        this.state = {
            questionTypes1 : [],
            questionTypes2 : [],
            questionTypes3 : [],
            questionTypes4 : [],
            questionTypes5 : [],
            newQuestionTypes2 : [],
            newQuestionTypes3 : [],
            newQuestionTypes4 : [],
            newQuestionTypes5 : [],
            showLevel: 1,
            selectedRowIndex1: -1,
            selectedRowIndex2: -1,
            selectedRowIndex3: -1,
            selectedRowIndex4: -1,
            selectedRowIndex5: -1,
            record1: {},
            record2: {},
            record3: {},
            record4: {},
            record5: {},
        }
    }

    componentDidMount =() => {       
        let { displayQuestionTypes } = this.props;
        let list1=[], list2=[], list3=[], list4=[], list5=[];

        //遍历问题分类
        if(displayQuestionTypes && displayQuestionTypes.length>0) {
            displayQuestionTypes.map(function(questionType, index){
                if(questionType.level==1) {
                    list1.push(questionType);
                } else if(questionType.level==2) {
                    list2.push(questionType);
                } else if(questionType.level==3) {
                    list3.push(questionType);
                } else if(questionType.level==4) {
                    list4.push(questionType);
                } else if(questionType.level==5) {
                    list5.push(questionType);
                }
            });
        }

        this.setState({
            questionTypes1 : list1,
            questionTypes2 : list2,
            questionTypes3 : list3,
            questionTypes4 : list4,
            questionTypes5 : list5
        });
    }

    //显示级数
    onLevelClick = (level, record, index) => {
        let questionTypes = [], newQuestionTypes=[];
        if(level==2) {
            this.state.questionTypes2.map(function(questionType, index){
                if(questionType && questionType.parentId==record.id) {
                    newQuestionTypes.push(questionType);
                }
            });
            this.setState({
                showLevel: level,
                selectedRowIndex1: index,
                selectedRowIndex2: -1,
                selectedRowIndex3: -1,
                selectedRowIndex4: -1,
                selectedRowIndex5: -1,
                record1: record,
                record2: {},
                record3: {},
                record4: {},
                record5: {},
                newQuestionTypes2: newQuestionTypes,
            });
            questionTypes.push(record);
            this.props.bindQuestionObj(questionTypes);
        } else if(level==3) {
            this.state.questionTypes3.map(function(questionType, index){
                if(questionType && questionType.parentId==record.id) {
                    newQuestionTypes.push(questionType);
                }
            });
            this.setState({
                showLevel: level,
                selectedRowIndex2: index,
                selectedRowIndex3: -1,
                selectedRowIndex4: -1,
                selectedRowIndex5: -1,
                record2: record,
                record3: {},
                record4: {},
                record5: {},
                newQuestionTypes3: newQuestionTypes,
            });
            questionTypes.push(this.state.record1);
            questionTypes.push(record);
            this.props.bindQuestionObj(questionTypes);
        } else if(level==4) {
            this.state.questionTypes4.map(function(questionType, index){
                if(questionType && questionType.parentId==record.id) {
                    newQuestionTypes.push(questionType);
                }
            });
            this.setState({
                showLevel: level,
                selectedRowIndex3: index,
                selectedRowIndex4: -1,
                selectedRowIndex5: -1,
                record3: record,
                record4: {},
                record5: {},
                newQuestionTypes4: newQuestionTypes,
            });
            questionTypes.push(this.state.record1);
            questionTypes.push(this.state.record2);
            questionTypes.push(record);
            this.props.bindQuestionObj(questionTypes);
        } else if(level==5) {
            this.state.questionTypes5.map(function(questionType, index){
                if(questionType && questionType.parentId==record.id) {
                    newQuestionTypes.push(questionType);
                }
            });
            this.setState({
                showLevel: level,
                selectedRowIndex4: index,
                selectedRowIndex5: -1,
                record4: record,
                record5: {},
                newQuestionTypes5: newQuestionTypes,
            });
            questionTypes.push(this.state.record1);
            questionTypes.push(this.state.record2);
            questionTypes.push(this.state.record3);
            questionTypes.push(record);
            this.props.bindQuestionObj(questionTypes);
        } else if(level==6) {
            this.setState({
                showLevel: level,
                selectedRowIndex5: index,
                record5: record,
            });
            questionTypes.push(this.state.record1);
            questionTypes.push(this.state.record2);
            questionTypes.push(this.state.record3);
            questionTypes.push(this.state.record4);
            questionTypes.push(record);
            this.props.bindQuestionObj(questionTypes);
        }
    }

    onCancel=()=>{
        this.setState({
            showModal : false
        });
    }

    /**
     * 
     * @param {数据} data
     * @param {} i
     * @param {} selectedRowIndex
     * @param {级别} level
     * @param {是否显示} display
     */
    createTable = (data,i,selectedRowIndex,level,display) => {
        let self = this;
        let column = [
            {
                dataIndex : "name",
                key : "name",
                width : 30
            }
        ];
        return <div className="question-type-tables-list">
            <Table
                bordered
                columns={column}
                data={display ? data : []}
                rowKey = { (record, index) => record.id}
                showHeader={false}
                onRowClick={(record,index,indent)=>{
                    self.onLevelClick( i, record, index );//把下一级显示出来
                }}
                rowClassName={(record,index,indent)=>{
                    if (selectedRowIndex == index) {
                        return 'selected';
                    } else {
                        return '';
                    }
                }}
                title={ () => {
                    return level
                }}
            />
        </div>
    }
        
    render() {
        let self = this;
        let { questionTypes1, questionTypes2, questionTypes3, questionTypes4, questionTypes5,
              newQuestionTypes2, newQuestionTypes3, newQuestionTypes4, newQuestionTypes5, 
              showLevel 
        } = this.state;
        
        //用于以后默认选择来使用
        // let { displayQuestionTypes } = this.props;

        //用于以后默认选择来使用
        // if(displayQuestionTypes && displayQuestionTypes.length>0) {
        //     newQuestionTypes=displayQuestionTypes.split("/");
        //     if(newQuestionTypes && newQuestionTypes.length>0) {
        //         let i = 2;
        //         newQuestionTypes.map((newQuestionType, index) => {
        //             self.onLevelClick( i, newQuestionType, index );
        //             i++;
        //         });
        //     }
        // }

        return(
            <div className="question-type-tables-box">
                { this.createTable(questionTypes1, 2, self.state.selectedRowIndex1, "一级", true) }
                { this.createTable(newQuestionTypes2, 3, self.state.selectedRowIndex2, "二级",
                    showLevel>1 && newQuestionTypes2 && newQuestionTypes2.length>0 )
                }
                { this.createTable(newQuestionTypes3, 4, self.state.selectedRowIndex3, "三级",
                    showLevel>2 && newQuestionTypes3 && newQuestionTypes3.length>0 )
                }
                { this.createTable(newQuestionTypes4, 5, self.state.selectedRowIndex4, "四级",
                    showLevel>3 && newQuestionTypes4 && newQuestionTypes4.length>0 )
                }
                { this.createTable(newQuestionTypes5, 6, self.state.selectedRowIndex5, "五级",
                    showLevel>4 && newQuestionTypes5 && newQuestionTypes5.length>0 )
                }
            </div>
        );
    }

}
export default QuestionTypeTables;