import { Button } from 'primereact/button';

const Page = (props) => {
    return (
        <div className="div-center">
            <Button type="button" icon="pi pi-arrow-left" onClick={props.handleBack} />
                <p className="p-center">Showing page {props.page} | {props.data.count} Entries</p>
            <Button type="button" icon="pi pi-arrow-right" onClick={props.handleNext} />
        </div>
    )
}

export default Page
