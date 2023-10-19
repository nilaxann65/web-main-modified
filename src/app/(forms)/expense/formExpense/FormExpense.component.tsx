'use client'
import { MenuItem, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import './FormExpense.component.css'

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import transactionDescriptionType from '@/app/_common/constants/TransactionDescriptionType.constant'
import { ModalSuccess, OverlayLoader } from '@/app/_components'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

import TypeModal from '@/app/_common/enum/typeModal'
import SnackbarMessage from '@/app/_components/Snackbar/SnackbarMessage.components'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { Transaction } from '../../../_common/models/transaction.class'
import SaveInvoice from '../../_services/SaveInvoice.service'
import { InvoiceType } from '@/app/_common/enum/invoiceType'

export default function FormExpense(): React.JSX.Element {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const today = dayjs()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Transaction>({
    mode: 'onChange',
    defaultValues: {
      userId: 100,
      date: today
    }
  })

  const [isOpen, setIsOpen] = React.useState(false)
  const [eventType, setTypeEvent] = React.useState('')

  const toggleModal = (): void => {
    setOpen(state => !state)
  }

  const handleRedirect = (): void => {
    setOpen(state => !state)
    router.back()
  }

  const onSubmit: SubmitHandler<Transaction> = data => {
    setLoading(true)
    SaveInvoice(data, InvoiceType.Expense).then(
      result => {
        toggleModal()
        setLoading(false)
        reset()
      },
      error => {
        setLoading(false)
        //TODO: Implementar el provider de alertas
        setTypeEvent('error')
        console.log('Error=>', error)
        setIsOpen(true)
      }
    )
  }

  const handleClose = (): void => {
    setIsOpen(false)
  }


  return (
    <div className="container">
      <h1>Registro de gasto</h1>
      <h4>Ingresa la información que desea registrar</h4>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="form-content"
      >
        <TextField
          label="Descripcion del Gasto"
          variant="standard"
          className="input"
          {...register('description', {
            required: { value: true, message: 'El nombre es requerido' },
            minLength: { value: 4, message: 'El minimo de caracteres es 4' }
          })}
          helperText={errors.description?.message}
        />

        <TextField
          select
          fullWidth
          variant="standard"
          label="Tipo de gasto"
          className="input"
          defaultValue=""
          inputProps={register('type', {
            required: { value: true, message: 'Selecione una opcion' }
          })}
          error={!(errors.type == null)}
          helperText={errors.type?.message}
        >
          <MenuItem value="">--Seleccione--</MenuItem>
          {transactionDescriptionType.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Monto gasto total en Bs."
          className="input"
          type="number"
          variant="standard"
          {...register('amount', {
            required: { value: true, message: 'El monto es requerido' },
            valueAsNumber: true
          })}
          helperText={errors.amount?.message}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Fecha de gasto"
                format="DD/MM/YYYY"
                value={dayjs(value)}
                onChange={onChange}
                className="input"
                slotProps={{
                  textField: {
                    variant: 'standard'
                  }
                }}
              />
            )}
          />
          {!(errors?.date == null) &&
            errors.date.type === 'required' && (
              <span className="error-msg">La fecha es requerida</span>
            )}
        </LocalizationProvider>

        <button type="submit" className="btn-secondary">
          Continuar
        </button>

        <OverlayLoader isLoading={loading} />
        <ModalSuccess
          isOpen={open}
          onClose={toggleModal}
          onRedirect={handleRedirect}
          typeTransaction="Gasto"
          type={TypeModal.sucess}
          text="Registro Exitoso"
        />
      </form>
      <SnackbarMessage
        open={isOpen}
        eventType={eventType}
        onClose={handleClose}
      />
    </div>
  )
}
