import React from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {Input} from '../../../../_metronic/partials/controls'
import {SubmitForm, SYSTEM_MODULES} from '../../../services/Functional'
import {Card, Col, Row} from "react-bootstrap";

const GroupSchema = Yup.object().shape({
    name: Yup.string().required('Group name is required'),
})

export const CustomForm = ({id, group, saveGroup}: any) => {
    const [updatedData, setUpdatedData] = React.useState(group)
    React.useEffect(() => {
        setTimeout(() => {
            setUpdatedData(group)
            for (const [key, module] of Object.entries(SYSTEM_MODULES.navigation)) {
                for (const [moduleKey, moduleValue] of Object.entries(module)) {
                    manageSelectAll(key, moduleKey)
                }
            }
            setUpdatedData(group)
        }, 1000)
    }, [group])
    let modules: JSX.Element[] = []

    const selectedCheckboxes = () => {
        let modules = []
        let checkedBoxes: any = document.querySelectorAll('input[name=modules]:checked')
        if (checkedBoxes) {
            for (const checkedBox of checkedBoxes) {
                modules.push(checkedBox.value)
            }
        }
        setUpdatedData({...updatedData, modules: modules})
    }
    const manageSelectAll = (module: any, moduleKey: string) => {
        // @ts-ignore
        const moduleLength = SYSTEM_MODULES['navigation'][module][moduleKey].length
        let checkboxes = document.querySelectorAll(`.${moduleKey}:checked`)
        let element: any = document.getElementById(`${moduleKey}_all`)
        if (moduleLength === checkboxes.length) {
            if (element) {
                element.checked = true
            }
        } else {
            if (element) {
                element.checked = false
            }
        }
        selectedCheckboxes()
    }
    const checkAll = (e: any, module: any) => {
        let checkboxes: any = document.getElementsByClassName(module)
        for (let i = 0; i < checkboxes.length; i++) {
            modules.push(checkboxes[i].value)
            checkboxes[i].checked = e.checked
            selectedCheckboxes()
        }
    }

    if (SYSTEM_MODULES.navigation) {
        for (const [key, module] of Object.entries(SYSTEM_MODULES.navigation)) {
            let allSubModules = []
            let allModules = []
            for (const [moduleKey, moduleValue] of Object.entries(module)) {
                let subModules = []

                for (const moduleKeyElement of moduleValue) {
                    subModules.push(
                        <div
                            className='form-check form-check-sm form-check-custom form-check-solid mb-3 d-flex gap-3 align-items-center '
                            key={moduleKeyElement}>
                            <input
                                type="checkbox"
                                name="modules"
                                id={`${moduleKey}_${key}_forHTML_${moduleKeyElement}`}
                                value={moduleKeyElement}
                                checked={updatedData.modules.includes(moduleKeyElement)}
                                className={`${moduleKey} form-check-input`}
                                onChange={() => manageSelectAll(key, moduleKey)}
                            />
                            <label htmlFor={`${moduleKey}_${key}_forHTML_${moduleKeyElement}`} className="text-capitalize cursor-pointer">
                            {(() => {
                                switch (moduleKeyElement.split('.')[1]) {
                                    case 'index':
                                        return 'listing'
                                    case 'edit':
                                        return 'update'
                                    case 'show':
                                        return 'read'
                                    default:
                                        return moduleKeyElement.split('.')[1]
                                }
                            })()}
                            </label>
                        </div>,
                    )
                }
                allSubModules.push(
                    <Col sm={12} md={6} lg={4} xl={2} className="parent_module"
                         key={moduleKey}>
                        <p className="my-5 text-capitalize">
                            <strong>{moduleKey.replace('_', ' ')}</strong>
                        </p>
                        <div
                            className='form-check form-check-sm form-check-custom form-check-solid mb-3 d-flex gap-3 align-items-center'>
                            <input
                                className='form-check-input'
                                type="checkbox"
                                name="select_all"
                                value={moduleKey}
                                id={`${moduleKey}_all`}
                                onChange={e => checkAll(e.target, moduleKey)}
                            />
                            <label htmlFor={`${moduleKey}_all`} className={'text-capitalize cursor-pointer'}>Select ALL</label>
                        </div>
                        {subModules}
                    </Col>,
                )
            }
            allModules.push(allSubModules)

            modules.push(
                <>
                    <div className="col-md-12 mt-5">
                        <h4>
                            <strong className="text-capitalize">
                                {key.replace('_', ' ')}
                            </strong>
                        </h4>
                    </div>
                    {allModules}
                </>,
            )
        }
    }

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={updatedData || group}
                validationSchema={GroupSchema}
                onSubmit={values => {
                    saveGroup(values)
                }}
            >
                {({
                      values,
                      handleSubmit,
                      touched,
                      errors,
                      handleChange,
                  }) => (
                    <>
                        <Form className="form">
                            <Row className="gap-7">
                                <Col md={12}>
                                    <Card className="gutter-b">
                                        <div className="card-body">
                                            <Row
                                                className="form-group row mb-3">
                                                <Col md={6}>
                                                    <div
                                                        className='form-check form-check-sm form-check-custom form-check-solid d-flex gap-2 align-items-center'>
                                                        <input
                                                            className='form-check-input'
                                                            type="checkbox"
                                                            name="is_active"
                                                            value="1"
                                                            checked={values.is_active}
                                                            onChange={e => {
                                                                handleChange(e)
                                                                setUpdatedData({
                                                                    ...updatedData,
                                                                    is_active: e.target.checked,
                                                                })
                                                            }}/>
                                                        <label
                                                            className="form-label mb-0">Is
                                                            Active</label>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label">
                                                            Title <span
                                                            className="text-danger">*</span>
                                                        </label>
                                                        <Field name="name"
                                                               disabled={!!id}
                                                               component={Input}
                                                               placeholder="Enter title"
                                                               onChange={(e: any) => {
                                                                   handleChange(e)
                                                                   setUpdatedData({
                                                                       ...updatedData,
                                                                       name: e.target.value,
                                                                   })
                                                               }}
                                                        />
                                                        <ErrorMessage
                                                            name='name'
                                                            component="div"
                                                            className="text-danger mt-2"/>
                                                    </div>
                                                </Col>
                                                <Col md={8}>
                                                    <div className="form-group">
                                                        <label
                                                            className="form-label">
                                                            Description
                                                        </label>
                                                        <Field
                                                            name="description"
                                                            as="textarea"
                                                            placeholder='Enter Description'
                                                            className="form-control"
                                                            rows={1}
                                                            onChange={(e: any) => {
                                                                handleChange(e)
                                                                setUpdatedData({
                                                                    ...updatedData,
                                                                    description: e.target.value,
                                                                })
                                                            }}
                                                        />
                                                        {/*{touched.description && errors.description && (*/}
                                                        {/*  <div className="invalid-feedback d-block">*/}
                                                        {/*    {errors.description}*/}
                                                        {/*  </div>*/}
                                                        {/*)}*/}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </Col>
                                <Col md={12} className="">
                                    <Card className="gutter-b">
                                        <div className="card-body">
                                            <Row>
                                                <Col md={12}>
                                                    <div
                                                        className="form-group mt-3">
                                                        <p className={'fw-bold fs-3'}>
                                                            Modules
                                                        </p>
                                                        <hr/>
                                                    </div>
                                                </Col>
                                            </Row>

                                            {modules.map((module, index) => (
                                                <div className="row"
                                                     key={index}>
                                                    {module}
                                                </div>
                                            ))}
                                            <div className={'border-bottom mb-3'}/>
                                            <SubmitForm
                                                handleSubmit={handleSubmit}
                                                values={values}
                                            />
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    )
}
