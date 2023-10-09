import React from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {Checkbox, Input} from '../../../../_metronic/partials/controls'
import Select from 'react-select'
// @ts-ignore
import PhoneInput from 'react-phone-input-2'
import {SubmitForm} from '../../../services/Functional'
import {Col, Row} from "react-bootstrap";


export const CustomForm = ({id, user, saveUser, groupsList}: any) => {
    const UserSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter full name')
            .max(50, 'Max 50 character allowed')
            .matches(/^[A-Z]+\s[A-Z]+(?:['_.\s][a-z]+)*$/i,
                'Full name is not valid. Ex John Doe',
            )
            .required('Full name is required'),
        phone: Yup.string().min(8, 'Phone must be at least 8 digit')
            .required('Phone is required'),
        username: Yup.string()
            .min(2, 'Please enter username')
            .matches(/^[a-z0-9._-]{3,}$/i, 'Username is not valid')
            .required('User name is required'),
        email: Yup.string().email('Invalid email format.')
            .required('Email is required'),
        group: Yup.string()
            .required('Group is required'),
        password: Yup.string()
            .min(8, 'Minimum 8 characters')
            .max(50, 'Maximum 50 characters')
            .required('Password is required'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password')], 'Password does not match')
            .required('Confirm password is required'),
        avatar: Yup.mixed()
            .test('fileFormat', 'Allow only jpg and png format', (value) => {
                if (!value || typeof value === 'string') {
                    return true
                }
                // @ts-ignore
                return ['image/jpg', 'image/jpeg', 'image/png'].includes(value?.type)
            }),
    })

    const UserEditSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter full name')
            .max(50, 'Max 50 character allowed')
            .matches(/^[A-Z]+\s[A-Z]+(?:['_.\s][a-z]+)*$/i,
                'Full name is not valid. Ex John Doe',
            )
            .required('Full name is required'),
        username: Yup.string()
            .required('User name is required'),
        phone: Yup.string().min(8, 'Phone must be at least 8 digit')
            .required('Phone is required'),
        email: Yup.string().email('Invalid email format.')
            .required('Email is required'),
        group: Yup.string()
            .required('Group is required.'),
        avatar: Yup.mixed()
            .test('fileFormat', 'Allow only jpg and png format', (value) => {
                if (!value || typeof value === 'string') {
                    return true
                }
                // @ts-ignore
                return ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
            }),
    })
    const [selectedOption, setSelectedOption] = React.useState(null)
    React.useEffect(() => {
        if (user.id && groupsList) {
            let option = groupsList.filter(function (group: any) {
                return parseInt(group.value) === parseInt(user.group)
            })
            if (option.length > 0) {
                setSelectedOption(option[0])
            }
        }
    }, [user, groupsList])

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={user}
                validationSchema={user.id ? UserEditSchema : UserSchema}
                onSubmit={(values) => {
                    saveUser(values)
                }}
            >
                {({values, handleSubmit, handleChange, handleBlur, setFieldValue, touched, errors}) => (
                    <>
                        <Form className='form'>

                            <div className='card gutter-b'>
                                <div className='card-body'>
                                    <Row className={'mb-3'}>
                                        <Col md={12}>
                                            <div
                                                className='form-group d-flex gap-2 align-items-center'>
                                                <Field component={Checkbox}
                                                       value='1'
                                                       isSelected={values.is_active}
                                                       name='is_active'/>
                                                <label
                                                    className='form-label mb-0'>Is
                                                    Active</label>
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row className='mb-3'>
                                        <Col md={4}>
                                            <div className='form-group'>
                                                <label className='form-label'>User
                                                    Group <span
                                                        className='text-danger'>*</span></label>
                                                <Select options={groupsList}
                                                        className='react-select-container'
                                                        classNamePrefix='react-select'
                                                        value={selectedOption}
                                                        name='group'
                                                        placeholder="Select a group"
                                                        onChange={(option: any) => {
                                                            let event = {
                                                                target: {
                                                                    name: 'group',
                                                                    value: option.value,
                                                                },
                                                            }
                                                            handleChange(event)
                                                            setSelectedOption(option)
                                                        }}
                                                        onBlur={() => {
                                                            handleBlur({target: {name: 'group'}})
                                                        }}
                                                />
                                                <ErrorMessage name='group'
                                                              component="div"
                                                              className="text-danger mt-2"/>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className={'mb-3'}>
                                        <Col md={4}>
                                            <div className='form-group'>
                                                <label className='form-label'>Full
                                                    Name <span
                                                        className='text-danger'>*</span></label>
                                                <Field name='name'
                                                       component={Input}
                                                       placeholder='John Doe'/>
                                                <ErrorMessage name='name'
                                                              component="div"
                                                              className="text-danger mt-2"/>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className='form-group'>
                                                <label
                                                    className='form-label'>Email <span
                                                    className='text-danger'>*</span></label>
                                                <Field name='email'
                                                       disabled={!!id}
                                                       component={Input}
                                                       type='email'
                                                       placeholder='Ex. mail@website.com'/>
                                                <ErrorMessage name='email'
                                                              component="div"
                                                              className="text-danger mt-2"/>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className='form-group'>
                                                <label
                                                    className='form-label'>Phone <span
                                                    className='text-danger'>*</span></label>
                                                <PhoneInput
                                                    inputClass="w-100"
                                                    buttonClass='flag_dropdown'
                                                    dropdownStyle={{backgroundColor: 'none'}}
                                                    enableSearch={true}
                                                    disableSearchIcon={true}
                                                    searchStyle={{width: '90%', margin: '0'}}
                                                    countryCodeEditable={true}
                                                    disableDropdown={!!id}
                                                    country='in'
                                                    value={user.country_code + user.phone}
                                                    inputProps={{
                                                        name: 'phone',
                                                        id: 'phone',
                                                        required: true,
                                                        disabled: !!id,
                                                    }}
                                                    onChange={(phone: any, data: any) => {
                                                        handleChange({
                                                            target: {
                                                                name: 'country_code',
                                                                value: data.dialCode,
                                                            },
                                                        })
                                                        let phone_number = phone.slice(data.dialCode.length)
                                                        handleChange({
                                                            target: {
                                                                name: 'phone',
                                                                value: phone_number,
                                                            },
                                                        })
                                                    }}
                                                    onBlur={() => {
                                                        handleBlur({target: {name: 'phone'}})
                                                    }}
                                                />
                                                <ErrorMessage name='phone'
                                                              component="div"
                                                              className="text-danger mt-2"/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className={'mb-3'}>
                                        <Col md={4}>
                                            <div className='form-group'>
                                                <label className='form-label'>User
                                                    Name <span
                                                        className='text-danger'>*</span></label>
                                                <Field name='username'
                                                       disabled={!!id}
                                                       component={Input}
                                                       placeholder='Enter Username'/>
                                                <ErrorMessage name='username'
                                                              component="div"
                                                              className="text-danger mt-2"/>
                                            </div>
                                        </Col>
                                        {(!values.id) && <>
                                            <Col md={4}>
                                                <div className='form-group'>
                                                    <label
                                                        className='form-label'>Password <span
                                                        className='text-danger'>*</span></label>
                                                    <Field name='password'
                                                           component={Input}
                                                           type='password'
                                                           placeholder='******'/>
                                                    <ErrorMessage
                                                        name='password'
                                                        component="div"
                                                        className="text-danger mt-2"/>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className='form-group'>
                                                    <label
                                                        className='form-label'>Confirm
                                                        Password <span
                                                            className='text-danger'>*</span></label>
                                                    <Field
                                                        name='confirm_password'
                                                        component={Input}
                                                        type='password'
                                                        placeholder='******'/>
                                                    <ErrorMessage
                                                        name='confirm_password'
                                                        component="div"
                                                        className="text-danger mt-2"/>
                                                </div>
                                            </Col>
                                        </>}
                                    </Row>
                                    <Row className={'mb-3'}>
                                        <Col md={4}>
                                            <div className="form-group">
                                                <div
                                                    className="d-flex justify-content-between">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="logo">Avatar</label>
                                                    {values.avatar && typeof values.avatar === 'string' &&
                                                        <a href={process.env.REACT_APP_AWS_URL + values.avatar}
                                                           rel="noreferrer"
                                                           target="_blank"><i
                                                            className="fa fa-image fa-lg"/></a>}
                                                </div>
                                                <input type="file"
                                                       className="form-control"
                                                       id="avatar"
                                                       name="avatar"
                                                       accept="image/*"
                                                       onChange={(event) => {
                                                           // @ts-ignore
                                                           setFieldValue('avatar', event.target.files[0])
                                                       }}/>
                                                <ErrorMessage name='avatar'
                                                              component="div"
                                                              className="text-danger mt-2"/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className={'mb-3'}>
                                        <Col md={12}>
                                            <div className='form-group'>
                                                <label className='form-label'>Internal
                                                    Notes</label>
                                                <Field name='internal_notes'
                                                       as='textarea'
                                                       placeholder='Enter Internal Notes'
                                                       className='form-control'
                                                       rows={2}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <SubmitForm handleSubmit={handleSubmit}
                                                values={values}/>
                                </div>
                            </div>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    )
}
