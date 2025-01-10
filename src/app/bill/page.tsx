import React from 'react'
import Image from 'next/image'
import ButtonAdd from '../components/ButtonAdd'
import ButtonPrimarySm from '../components/ButtonPrimarySm'
import MyInput from '../components/MyInput'

export default function Bill() {
  return (
    <div className='flex flex-col items-start justify-center px-[10%] w-screen py-32 space-y-16'>
        <div className='flex flex-row items-center justify-center space-x-8'>
            <h2 className='text-3xl text-primary font-bold'>Registrando</h2>
            <Image
            src={"/pen.png"}
            alt={"Pen Image"}
            width={32}
            height={32}
            />
        </div>

        <div className='flex flex-col items-start justify-between space-y-8'>
          <div className='flex flex-col items-start justify-center space-y-8'>
            <h3 className='text-2xl font-bold text-primary'>Cadastrar itens consumidos</h3>
            <div className='flex flex-row items-end justify-center space-x-8'>
              <MyInput 
                name='Nome do item' 
                label='Nome do item' 
                value=''
                placeholder='Ex: Cerveja' 
              />
              <p className='font-bold text-primary'>X</p>
              <MyInput 
                name='Nome do item' 
                label='Quantidade' 
                value=''
                placeholder='Ex: 8' 
              />
              <p className='font-bold text-primary'>R$</p>
              <MyInput 
                name='Nome do item' 
                label='Valor unitário' 
                value=''
                placeholder='Ex: 10,00' 
              />
            </div>
            <ButtonAdd text='Adicionar item'/>
          </div>

          <div className='flex flex-col items-start justify-center space-y-8'>
            <div className='flex flex-col items-start justify-center space-y-8'>
            <h3 className='text-2xl font-bold text-primary'>Cadastrar participantes</h3>
            <MyInput 
              name='Nome do item' 
              label='Nome do participante' 
              value=''
              placeholder='Ex: Rafael' 
            />
            </div>
            <ButtonAdd text='Adicionar participante'/>
          </div>
        </div>

        <ButtonPrimarySm text='Avançar'/>
    </div>
  )
}
